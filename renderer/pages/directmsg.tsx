import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DmListItem from '../components/directmsg/ListItem';
import { useAuth } from '../firebase/authContext';
import { dmListListeners, offDmListListeners } from '../firebase/realtimeDB';
import { DmRoomType } from '../types/chatRoom';

const DirectMsg = () => {

  const { User } = useAuth();
  const [DmRooms, setDmRooms] = useState<DmRoomType[]>([]);

  useEffect(() => {
    dmListListeners(User.uid, setDmRooms);

    return () => {
      offDmListListeners();
    }
  }, []);

  return (
    <div className='inner'>
      <Head>
        <title>DIRECT MESSAGE - YUJOO CHAT</title>
      </Head>
      <h1>다이렉트 메세지</h1>
      <Styled.UserList>
        {DmRooms.length > 0 && DmRooms.map((item) => {
          delete item.users[User.uid];
          
          return <DmListItem key={item.id} {...item}></DmListItem>
        })}
      </Styled.UserList>
    </div>
  )
}

export default DirectMsg;

const Styled = {
  UserList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
}