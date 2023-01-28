import styled from 'styled-components';
import { useAuth } from '../../firebase/authContext';
import { DmRoomType } from '../../types/chatRoom';

const DmRoomHeader = ({ totalCount, users }: DmRoomType) => {

  const { User } = useAuth();
  delete users[User.uid];
  const { displayName, photoURL } = Object.values(users)[0];

  return (
    <Styled.Wrapper>
      <Styled.Title>
        <Styled.RoomIcon>
          <img src={photoURL} alt={displayName} />
        </Styled.RoomIcon>
        <span>{displayName}</span>
      </Styled.Title>
      <Styled.Side>
        <Styled.Secret>
          <Styled.Icon />
          Direct Message
        </Styled.Secret>
        <Styled.Counter>
          {totalCount} messages
        </Styled.Counter>
      </Styled.Side>
    </Styled.Wrapper>
  )
}

export default DmRoomHeader;

const Styled = {
  Wrapper: styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
  `,
  Title: styled.h2`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  RoomIcon: styled.i`
    width: 40px;
    height: 40px;
    overflow: hidden;
    border: 1px solid #00631c;
    border-radius: 50%;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  Side: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  `,
  Secret: styled.p`
    padding: 2px 5px;
    background-color: #efefef;
    border-radius: 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 3px;
  `,
  Icon: styled.i`
    width: 14px;
    height: 14px;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z'/%3E%3Cpath d='M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z'/%3E%3C/svg%3E");
  `,
  Counter: styled.p`
    font-size: 12px;
  `,
}