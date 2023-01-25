import Head from 'next/head';
import styled from 'styled-components';
import DmListItem from '../components/DmListItem';
import Layout from '../components/common/Layout';

const DirectMsg = () => {
  return (
    <>
      <Head>
        <title>DIRECT MESSAGE - YUJOO CHAT</title>
      </Head>
      <h1>다이렉트 메세지</h1>
      <Styled.UserList>
        {Array(20).fill('유저').map((item: string, idx: number) => (
          <DmListItem key={idx}>{item}</DmListItem>
        ))}
      </Styled.UserList>
    </>
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