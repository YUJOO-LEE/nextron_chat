import Head from 'next/head';
import Link from 'next/link';
import Input from '../components/common/Input';
import styled from 'styled-components';
import Button from '../components/common/Button';
import { NextPage } from 'next';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useAuth } from '../firebase/authContext';
import { errorMsg } from '../data/errorMsg';

const Signup: NextPage = () => {
  const { signup } = useAuth();

  const [UserEmail, setUserEmail] = useState<string>('');
  const [UserPw, setUserPw] = useState<string>('');
  const [UserPw2, setUserPw2] = useState<string>('');
  const [UserName, setUserName] = useState<string>('');
  const [Loading, setLoading] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState<string>('');

  const handleSignup: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!UserEmail || !UserPw || !UserName) {
      return setErrorMsg(errorMsg['signup-form-is-empty']);
    }

    if (UserPw !== UserPw2) {
      return setErrorMsg(errorMsg['pw-are-diffent']);
    }

    try{
      setLoading(true);
      await signup(UserEmail, UserPw, UserName);
    } catch(err) {
      console.error(err);
      setErrorMsg(errorMsg[err.code] || errorMsg['signup-defualt-error']);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>SIGN UP - YUJOO CHAT</title>
      </Head>
      <Styled.Wrapper>
        <form onSubmit={handleSignup}>
          <Styled.Title>회원가입</Styled.Title>
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
              <Input type='password' name='userPw2'
                placeholder='비밀번호를 재입력하세요'
                value={UserPw2}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setUserPw2(e.target.value)}
              />
              <label htmlFor='userPw2'>비밀번호 재입력</label>
            </Styled.ListItem>
            <Styled.ListItem>
              <Input type='text' name='userName'
                placeholder='닉네임을 입력하세요'
                value={UserName}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
              />
              <label htmlFor='userName'>닉네임</label>
            </Styled.ListItem>

            {ErrorMsg &&
              <Styled.ErrorMsg>
                {ErrorMsg}
              </Styled.ErrorMsg>}

            <Styled.ListItem>
              <Button type='submit' className='big green' disabled={Loading}>회원가입</Button>
            </Styled.ListItem>
          </Styled.ListWrapper>
        </form>
        <Styled.Login>
          <span>이미 회원가입을 하셨나요?</span>
          <Link href='/home'>로그인</Link>
        </Styled.Login>
      </Styled.Wrapper>
    </>
  )
}

export default Signup;

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
  ErrorMsg: styled.li`
    text-align: center;
    font-size: 14px;
    color: red;
  `,
  Login: styled.p`
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
