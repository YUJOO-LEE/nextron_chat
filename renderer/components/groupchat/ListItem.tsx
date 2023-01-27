import Link from 'next/link';
import styled from 'styled-components';
import { ChatRoomType } from '../../types/chatRoom';

const GroupChatListItem = ({ id, roomName, createdBy, totalCount }: ChatRoomType) => {
  return (
    <Styled.Item>
      <Styled.Title>
        <Link href={`/group/${id}`}>{roomName}</Link>
      </Styled.Title>

      <Styled.UserCount>
        <Styled.Icon />
        <span>{totalCount}</span>
      </Styled.UserCount>
    </Styled.Item>
  )
}

export default GroupChatListItem;

const Styled = {
  Item: styled.li`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  `,
  Icon: styled.i`
    width: 15px;
    height: 15px;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23666' viewBox='0 0 24 24'%3E%3Cpath d='M24,16v5a3,3,0,0,1-3,3H16a8,8,0,0,1-6.92-4,10.968,10.968,0,0,0,2.242-.248A5.988,5.988,0,0,0,16,22h5a1,1,0,0,0,1-1V16a5.988,5.988,0,0,0-2.252-4.678A10.968,10.968,0,0,0,20,9.08,8,8,0,0,1,24,16ZM17.977,9.651A9,9,0,0,0,8.349.023,9.418,9.418,0,0,0,0,9.294v5.04C0,16.866,1.507,18,3,18H8.7A9.419,9.419,0,0,0,17.977,9.651Zm-4.027-5.6a7.018,7.018,0,0,1,2.032,5.46A7.364,7.364,0,0,1,8.7,16H3c-.928,0-1-1.275-1-1.666V9.294A7.362,7.362,0,0,1,8.49,2.018Q8.739,2,8.988,2A7.012,7.012,0,0,1,13.95,4.051Z'/%3E%3C/svg%3E");
  `,
  Title: styled.p`
    flex: 1;
    color: #444;
  `,
  UserCount: styled.p`
    display: flex;
    align-items: center;
    gap: 5px;

    span{
      font-size: 14px;
      color: #444;
    }
  `,
}