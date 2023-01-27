import { UserType } from './../types/user';
import { child, ref, set, push, onChildAdded, off } from 'firebase/database';
import { realtimeDB } from '../config/firebase';
import { ChatRoomType } from '../types/chatRoom';
import { Dispatch, SetStateAction } from 'react';

export const setNewChatRoom = async (roomName: string, user: UserType) => {
  const { displayName, photoURL } = user;
  const chatRoomRef = ref(realtimeDB, 'chatroom');
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
  const chatRoomRef = ref(realtimeDB, 'chatroom');

  onChildAdded(chatRoomRef, (data) => {
    chatRooms.push(data.val());
    
    setTimeout(() => {
      setChatRooms([...chatRooms]);
    }, 200);
  });
}

export const offChatRoomsListeners = () => {
  const chatRoomRef = ref(realtimeDB, 'chatroom');
  off(chatRoomRef);
}