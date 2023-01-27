export type ChatRoomType = {
  id: string;
  roomName: string;
  createdBy: {
    displayName: string;
    photoURL: string;
  };
  totalCount: number;
}

export type MessageType = {
  content: string;
  timestamp: number;
  user: {
    displayName: string;
    photoURL: string;
    uid: String;
  }
}