import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import UserListItem from '../components/UserListItem';

const UserList = () => {
  return (
    <>
      <Head>
        <title>USER LIST - YUJOO CHAT</title>
      </Head>
      <Layout>
        <h1>유저 리스트</h1>
        <Styled.UserList>
          {Array(20).fill('유저').map((item: string) => (
            <UserListItem>{item}</UserListItem>
          ))}
        </Styled.UserList>
      </Layout>
    </>
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