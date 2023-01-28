import { UserType } from './../types/user';
import { child, ref, set, push, onChildAdded, off, onValue, serverTimestamp, query, orderByChild, update, get, onChildChanged } from 'firebase/database';
import { realtimeDB } from '../config/firebase';
import { ChatRoomType, MessageType } from '../types/chatRoom';
import { Dispatch, SetStateAction } from 'react';


// 유저 리스트 조회
export const userListListeners = (setUserList: Dispatch<SetStateAction<UserType[]>>) => {
  const userListRef = ref(realtimeDB, 'users');
  const userList = {};

  onChildAdded(userListRef, (data) => {
    userList[data.val().uid] = data.val();
    
    setTimeout(() => {
      setUserList(Object.values(userList));
    }, 200);
  });

  onChildChanged(userListRef, (data) => {
    userList[data.val().uid] = data.val();
    
    setTimeout(() => {
      setUserList(Object.values(userList));
    }, 200);
  });
}

// 유저리스트 감시 종료
export const offuserListListeners = () => {
  const userListRef = ref(realtimeDB, 'users');
  off(userListRef);
}

// 채팅방 생성
export const setNewChatRoom = async (roomName: string, user: UserType) => {
  const chatRoomRef = ref(realtimeDB, 'chatroom');
  const { displayName, photoURL } = user;
  const key = push(chatRoomRef).key;

  const newChatRoom = {
    id: key,
    roomName,
    createdBy: { displayName, photoURL },
    totalCount: 0,
    lastUpdatedAt: serverTimestamp(),
  }

  await set(child(chatRoomRef, key), newChatRoom);
}

// 채팅방 리스트 조회
export const addChatRoomsListeners = (setChatRooms: Dispatch<SetStateAction<ChatRoomType[]>>) => {
  const chatRoomRef = query(ref(realtimeDB, 'chatroom'), orderByChild('lastUpdatedAt'));
  const chatRooms = [];

  onChildAdded(chatRoomRef, (data) => {
    chatRooms.unshift(data.val());
    
    setTimeout(() => {
      setChatRooms([...chatRooms]);
    }, 200);
  });
}

// 채팅방 감시 종료
export const offChatRoomsListeners = () => {
  const chatRoomRef = ref(realtimeDB, 'chatroom');
  off(chatRoomRef);
}

// 채팅방 정보 조회
export const getChatRoomData = (roomId: string | string[], setChatRoomData: Dispatch<SetStateAction<ChatRoomType>>, isPrivateRoom?: true) => { 
  roomId = Array.isArray(roomId) ? roomId[0] : roomId;
  const roomType = isPrivateRoom ? 'dmroom/' : 'chatroom/';
  const chatRoomRef = ref(realtimeDB, roomType + roomId);
  onValue(chatRoomRef, (data) => {
    setChatRoomData(data.val());
  })
}

// 메세지 저장
export const addNewMessage = async (
  roomId: string | string[], user: UserType, content: string
) => {
  roomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const messagesRef = ref(realtimeDB, 'messages');
  const newMsg = createMessage(user, content);
  await set(push(child(messagesRef, roomId)), newMsg);

  const chatRoomRef = ref(realtimeDB, 'chatroom/' + roomId + '/totalCount');
  const totalCount = await (await get(chatRoomRef)).val();
  await update(ref(realtimeDB, 'chatroom/' + roomId), {
    totalCount: totalCount + 1,
    lastUpdatedAt: serverTimestamp(),
  });
}

// 새 메세지 생성
const createMessage = (user: UserType, content: string) => {
  const { uid, displayName, photoURL } = user;

  const message = {
    timestamp: serverTimestamp(),
    user: {
      uid,
      displayName,
      photoURL,
    },
    content,
  }

  return message;
}

// 메세지 조회
export const addMessagesListeners = (
  roomId: string | string[],
  setMessages: Dispatch<SetStateAction<MessageType[]>>,
) => {
  roomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const messagesRef = ref(realtimeDB, 'messages/' + roomId);
  const messages = [];

  onChildAdded(messagesRef, (data) => {
    messages.push(data.val());
    
    setTimeout(() => {
      setMessages([...messages]);
    }, 200);
  });
}

// 메세지 생성 감시 종료
export const offMessagesListeners = () => {
  const messagesRef = ref(realtimeDB, 'messages');
  off(messagesRef);
}

// DM 방 생성
export const setNewDmRoom = async (
  myData: Pick<UserType, 'uid' | 'displayName' | 'photoURL'>,
  anotherData: Pick<UserType, 'uid' | 'displayName' | 'photoURL'>
) => {
  const roomId = getDmRoomID(myData.uid, anotherData.uid);
  const dmRoomRef = ref(realtimeDB, 'dmroom/' + roomId);
  
  const users = {};
  users[myData.uid] = myData;
  users[anotherData.uid] = anotherData;

  const newChatRoom = {
    id: roomId,
    totalCount: 0,
    lastUpdatedAt: serverTimestamp(),
    users,
  }

  await set(dmRoomRef, newChatRoom);
}

// DM 방 id 생성
export const getDmRoomID = (myUid: string, anotherUid: string | string[]) => {
  anotherUid = Array.isArray(anotherUid) ? anotherUid[0] : anotherUid;
  return myUid < anotherUid ? myUid + '-' + anotherUid : anotherUid + '-' + myUid;
}

// DM 방 리스트 조회
export const dmListListeners = (uid: string, setDmRooms: Dispatch<SetStateAction<ChatRoomType[]>>) => {
  const dmRoomRef = query(ref(realtimeDB, 'dmroom'), orderByChild('lastUpdatedAt'));
  const dmRooms = [];

  onChildAdded(dmRoomRef, (data) => {
    if (data.key.includes(uid)) {
      dmRooms.unshift(data);
    
      setTimeout(() => {
        setDmRooms([...dmRooms]);
      }, 200);
    }
  });
}

// DM 데이터 유무 조회
export const checkRoomData = async (roomId: string | string[]) => { 
  roomId = Array.isArray(roomId) ? roomId[0] : roomId;
  const chatRoomRef = ref(realtimeDB, 'dmroom/' + roomId);
  const result = await get(chatRoomRef);

  return !!result.val();
}