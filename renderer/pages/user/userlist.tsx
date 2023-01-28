import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserListItem from '../../components/userlist/ListItem';
import { useAuth } from '../../firebase/authContext';
import { offuserListListeners, userListListeners } from '../../firebase/realtimeDB';
import { UserType } from '../../types/user';

const UserList = () => {

  const { User } = useAuth();
  const [UserList, setUserList] = useState<Pick<UserType, 'uid' | 'displayName' | 'photoURL'>[]>([]);

  useEffect(() => {
    userListListeners(setUserList);

    return () => {
      offuserListListeners();
    }
  }, []);

  return (
    <div className='inner'>
      <Head>
        <title>USER LIST - YUJOO CHAT</title>
      </Head>
      <h1>유저 리스트</h1>
      <Styled.UserList>
        {UserList
          .filter(({uid}) => uid !== User.uid)
          .map((user) => (
            <UserListItem key={user.uid} {...user} />
          ))}
      </Styled.UserList>
    </div>
  )
}

export default UserList;

const Styled = {
  UserList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
}