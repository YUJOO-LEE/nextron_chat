import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroupChatHeader from '../../components/groupchat/ListHeader';
import GroupChatListItem from '../../components/groupchat/ListItem';
import { addChatRoomsListeners, offChatRoomsListeners } from '../../firebase/realtimeDB';
import { ChatRoomType } from '../../types/chatRoom';

const GroupChat = () => {
  const [ChatRooms, setChatRooms] = useState<ChatRoomType[]>([]);

  useEffect(() => {
    addChatRoomsListeners(setChatRooms);

    return () => {
      offChatRoomsListeners();
    }
  }, []);

  return (
    <div className='inner'>
      <Head>
        <title>GROUP CHAT - YUJOO CHAT</title>
      </Head>
      <GroupChatHeader totalCount={ChatRooms.length} />
      <Styled.UserList>
        {ChatRooms.length > 0 && ChatRooms.map(item => (
          <GroupChatListItem key={item.id} {...item} />
        ))}
      </Styled.UserList>
    </div>
  )
}

export default GroupChat;

const Styled = {
  UserList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
}