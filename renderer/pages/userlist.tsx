import Head from 'next/head';
import styled from 'styled-components';
import UserListItem from '../components/UserListItem';

const UserList = () => {
  return (
    <div className='inner'>
      <Head>
        <title>USER LIST - YUJOO CHAT</title>
      </Head>
      <h1>유저 리스트</h1>
      <Styled.UserList>
        {Array(20).fill('유저').map((item: string, idx: number) => (
          <UserListItem key={idx}>{item}</UserListItem>
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