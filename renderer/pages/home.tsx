import Head from 'next/head';
import Link from 'next/link';
import Input from '../components/common/Input';
import styled from 'styled-components';
import Button from '../components/common/Button';
import { NextPage } from 'next';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [UserEmail, setUserEmail] = useState<string>('');
  const [UserPw, setUserPw] = useState<string>('');

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();

    try{
      await login(UserEmail, UserPw);
      router.push('/userlist');
    } catch(err) {
      console.error(err);
    }
  }


  return (
    <>
      <Head>
        <title>LOGIN - YUJOO CHAT</title>
      </Head>
      <Styled.Wrapper>
        <form onSubmit={handleLogin}>
          <Styled.Title>YUJOO CHAT</Styled.Title>
          <Styled.ListWrapper>
            <Styled.ListItem>
              <Input type='text' name='userEmail'
                placeholder='이메일을 입력하세요' 
                value={UserEmail}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
              />
              <label htmlFor='userEmail'>이메일</label>
            </Styled.ListItem>
            <Styled.ListItem>
              <Input type='password' name='userPw'
                placeholder='비밀번호를 입력하세요'
                value={UserPw}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setUserPw(e.target.value)}
              />
              <label htmlFor='userPw'>비밀번호</label>
            </Styled.ListItem>
            <Styled.ListItem>
              <Button type='submit' className='big green'>로그인</Button>
            </Styled.ListItem>
          </Styled.ListWrapper>
        </form>
        <Styled.Signup>
          <span>아직 회원가입을 하지 않으셨나요?</span>
          <Link href='/signup'>회원가입</Link>
        </Styled.Signup>

        {/* 테스트용 */}
        <Link href='/userlist'>채팅</Link>
      </Styled.Wrapper>
    </>
  );
};

export default Home;

const Styled = {
  Wrapper: styled.div`
    max-width: 320px;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin: 0 auto;
  `,
  Title: styled.h1`
    text-align: center;
    margin-bottom: 20px;
  `,
  ListWrapper: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  `,
  ListItem: styled.li`
    display: flex;
    flex-direction: column;
    gap: 5px;

    label{
      font-size: 0;
    }

    input:placeholder-shown{
      font-size: 14px;
      line-height: 18px;
    }
  `,
  Signup: styled.p`
    span{
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      color: #666;
    }
    a{
      display: block;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #ddd;
      font-size: 16px;
      text-align: center;
    }
  `,
}
