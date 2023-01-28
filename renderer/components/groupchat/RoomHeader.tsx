import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getChatRoomData } from '../../firebase/realtimeDB';
import { ChatRoomType } from '../../types/chatRoom';

const GroupChatRoomHeader = ({ roomId }: { roomId: string }) => {
  const [ChatRoomData, setChatRoomData] = useState<ChatRoomType>(null);

  useEffect(() => {
    getChatRoomData(roomId, setChatRoomData);
  }, []);

  return (
    <Styled.Wrapper>
      {ChatRoomData &&
      <>
        <Styled.Title>
          {/* <Styled.RoomIcon>
            <img src={ChatRoomData.createdBy.photoURL} alt={ChatRoomData.createdBy.displayName} />
          </Styled.RoomIcon> */}
          <span>{ChatRoomData.roomName}</span>
        </Styled.Title>
        <Styled.Side>
          <Styled.Creater>
            <span>Created by </span>
            {ChatRoomData.createdBy.displayName}
          </Styled.Creater>
          <Styled.Counter>
            {ChatRoomData.totalCount} messages
          </Styled.Counter>
        </Styled.Side>
      </>}
    </Styled.Wrapper>
  )
}

export default GroupChatRoomHeader;

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
  Creater: styled.p`
    padding: 2px 5px;
    background-color: #efefef;
    border-radius: 5px;
    font-size: 14px;
    span{
      font-size: 12px;
    }
  `,
  Counter: styled.p`
    font-size: 12px;
  `,
}