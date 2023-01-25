import Head from 'next/head';
import styled from 'styled-components';
import GroupChatHeader from '../components/groupchat/ListHeader';
import GroupChatListItem from '../components/groupchat/ListItem';

const GroupChat = () => {
  return (
    <div className='inner'>
      <Head>
        <title>GROUP CHAT - YUJOO CHAT</title>
      </Head>
      <GroupChatHeader />
      <Styled.UserList>
        {Array(20).fill('채팅방').map((item: string, idx: number) => (
          <GroupChatListItem key={idx}>{item}</GroupChatListItem>
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