import Head from 'next/head';
import styled from 'styled-components';
import GroupChatListItem from '../components/GroupChatListItem';
import Layout from '../components/common/Layout';

const GroupChat = () => {
  return (
    <>
      <Head>
        <title>GROUP CHAT - YUJOO CHAT</title>
      </Head>
      <Layout>
        <h1>그룹 채팅</h1>
        <Styled.UserList>
          {Array(20).fill('채팅방').map((item: string) => (
            <GroupChatListItem>{item}</GroupChatListItem>
          ))}
        </Styled.UserList>
      </Layout>
    </>
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