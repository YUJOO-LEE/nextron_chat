import Link from 'next/link';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const GroupChatListItem = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Item>
      <Styled.Title>
        <Link href='/group/1'>{children}</Link>
      </Styled.Title>

      <Styled.UserCount>
        <Styled.Icon />
        <span>10</span>
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z'/%3E%3Cpath d='M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z'/%3E%3C/svg%3E");
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