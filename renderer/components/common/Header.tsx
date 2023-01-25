import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/authContext';
import Tooltip from './Tooltip';

const Header = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout: FormEventHandler = (e) => {
    e.preventDefault();
    logout();
    router.push('/home');
  }

  return (
    <Styled.Wrapper>
      <Styled.ListWrapper>
        <Styled.ListItem className='userlist'>
          <Link href='/userlist'> </Link>
          <Tooltip left='30px'>유저 리스트</Tooltip>
        </Styled.ListItem>
        <Styled.ListItem className='groupchat'>
          <Link href='/groupchat'> </Link>
          <Tooltip left='30px'>그룹 채팅</Tooltip>
        </Styled.ListItem>
        <Styled.ListItem className='directmsg'>
          <Link href='/directmsg'> </Link>
          <Tooltip left='30px'>다이렉트 메세지</Tooltip>
        </Styled.ListItem>
        <Styled.Blank />
        <Styled.ListItem className='signout'>
          <a onClick={handleLogout}> </a>
          <Tooltip left='30px'>로그아웃</Tooltip>
        </Styled.ListItem>
      </Styled.ListWrapper>
    </Styled.Wrapper>
  )
}

export default Header;

const Styled = {
  Wrapper: styled.header`
    position: fixed;
    z-index: 10;
    width: 60px;
    height: 100%;
    padding: 5px;
    background-color: #00631c;
  `,
  ListWrapper: styled.ul`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    gap: 30px;
  `,
  ListItem: styled.li`
    position: relative;

    a{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      overflow: hidden;
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      opacity: 0.5;
      
      &:hover{
        opacity: 1;

        ~.tooltip{
          display: flex;
        }
      }
      
      &.on{
        opacity: 1;
      }
    }

    &.userlist a{
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18,0H8A5,5,0,0,0,3.424,3H2A1,1,0,0,0,2,5H3V7H2A1,1,0,0,0,2,9H3v2H2a1,1,0,0,0,0,2H3v2H2a1,1,0,0,0,0,2H3v2H2a1,1,0,0,0,0,2H3.424A5,5,0,0,0,8,24H18a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,18,0Zm3,19a3,3,0,0,1-3,3H8a3,3,0,0,1-3-3V5A3,3,0,0,1,8,2H18a3,3,0,0,1,3,3Zm-8-7a3,3,0,0,0,0-6A3,3,0,0,0,13,12Zm5,6a1,1,0,0,1-2,0,3,3,0,0,0-6,0,1,1,0,0,1-2,0C8.211,11.392,17.791,11.394,18,18Z'/%3e%3c/svg%3e");
    }

    &.groupchat a{
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z'/%3e%3c/svg%3e");
    }
    
    &.directmsg a{
      background-image: url("data:image/svg+xml,%3csvg viewBox='-1 -1 26 26' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z'/%3e%3c/svg%3e");
    }

    &.signout a{
      background-image: url("data:image/svg+xml,%3csvg viewBox='-1 -1 26 26' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.476,15a1,1,0,0,0-1,1v3a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7.476a3,3,0,0,1,3,3V8a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7.476a5.006,5.006,0,0,0,5-5V16A1,1,0,0,0,11.476,15Z'%3e%3c/path%3e%3cpath d='M22.867,9.879,18.281,5.293a1,1,0,1,0-1.414,1.414l4.262,4.263L6,11a1,1,0,0,0,0,2H6l15.188-.031-4.323,4.324a1,1,0,1,0,1.414,1.414l4.586-4.586A3,3,0,0,0,22.867,9.879Z'/%3e%3c/svg%3e");
    }
  `,
  Blank: styled.li`
    flex: 1;
  `,
}