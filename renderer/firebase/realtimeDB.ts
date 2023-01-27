import { UserType } from './../types/user';
import { child, ref, set, push, onChildAdded, off, onValue, serverTimestamp, query, orderByChild, update, get } from 'firebase/database';
import { realtimeDB } from '../config/firebase';
import { ChatRoomType, MessageType } from '../types/chatRoom';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';


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
  }

  await set(child(chatRoomRef, key), newChatRoom);
}

// 채팅방 리스트 조회
export const addChatRoomsListeners = (setChatRooms: Dispatch<SetStateAction<ChatRoomType[]>>) => {
  const chatRoomRef = query(ref(realtimeDB, 'chatroom'), orderByChild('totalCount'));
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
export const getChatRoomData = (roomId: string | string[], setChatRoomData: Dispatch<SetStateAction<ChatRoomType>>) => { 
  roomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const chatRoomRef = ref(realtimeDB, 'chatroom/' + roomId);
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

  const chatRoomRef = ref(realtimeDB, 'chatroom/' + roomId);
  const getCount = await (await get(child(chatRoomRef, 'totalCount'))).val() || 0;
  await update(ref(realtimeDB, 'chatroom/' + roomId), {totalCount: getCount + 1});
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