import { UserType } from './../types/user';
import { child, ref, set, push, onChildAdded, off, onValue } from 'firebase/database';
import { realtimeDB } from '../config/firebase';
import { ChatRoomType } from '../types/chatRoom';
import { Dispatch, SetStateAction } from 'react';

const chatRoomRef = ref(realtimeDB, 'chatroom');

export const setNewChatRoom = async (roomName: string, user: UserType) => {
  const { displayName, photoURL } = user;
  const key = push(chatRoomRef).key;

  const newChatRoom = {
    id: key,
    roomName,
    createdBy: { displayName, photoURL }
  }

  await set(child(chatRoomRef, key), newChatRoom);
}

export const addChatRoomsListeners = (setChatRooms: Dispatch<SetStateAction<ChatRoomType[]>>) => {
  const chatRooms = [];

  onChildAdded(chatRoomRef, (data) => {
    chatRooms.push(data.val());
    
    setTimeout(() => {
      setChatRooms([...chatRooms]);
    }, 200);
  });
}

export const offChatRoomsListeners = () => {
  off(chatRoomRef);
}

export const getChatRoomData = (id: string | string[], setChatRoomData: Dispatch<SetStateAction<ChatRoomType>>) => { 
  const chatRoomRef = ref(realtimeDB, 'chatroom/' + id);
  onValue(chatRoomRef, (data) => {
    setChatRoomData(data.val());
  })
}