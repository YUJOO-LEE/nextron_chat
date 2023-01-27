import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../firebase/authContext';
import { addMessagesListeners, offMessagesListeners } from '../../firebase/realtimeDB';
import { MessageType } from '../../types/chatRoom';
import moment from 'moment';

const GroupChatRoomContent = () => {

  const { User } = useAuth();
  const router = useRouter();
  const { roomId } = router.query;

  const messageBottom = useRef<HTMLDivElement>(null);
  const [Messages, setMessages] = useState<MessageType[]>([]);

  // 타임스탬프 문자로 변환
  const timeFromNow = (timestamp: number) => (
    moment(timestamp).fromNow()
  );

  useEffect(() => {
    messageBottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Messages])

  useEffect(() => {
    addMessagesListeners(roomId, setMessages);

    return (() => {
      offMessagesListeners();
    })
  }, []);

  return (
    <Styled.ListWrapper>
      {Messages.length > 0 && <>
        {Messages.map(({ content, user, timestamp }) => {
          const { displayName, photoURL, uid } = user;
          const date = timeFromNow(timestamp);

          return (
            <Styled.ListItem 
              key={timestamp}
              className={uid === User.uid ? 'me' : undefined}
            >
              <p>
                {displayName}
                <span>{date}</span>
              </p>
              <Styled.Message>{content}</Styled.Message>
            </Styled.ListItem>
          )
        })}
        <div ref={messageBottom} />
      </>}
    </Styled.ListWrapper>
  )
}

export default GroupChatRoomContent;

const Styled = {
  ListWrapper: styled.ul`
    padding: 10px 20px;
    min-height: 0;
    flex: 1;
    overflow: auto;
    background: linear-gradient(0deg, #fff, #efefef);
  `,
  ListItem: styled.li`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;

    p{
      font-size: 14px;

      span{
        margin-left: 5px;
        font-size: 12px;
        color: #666;
      }
    }

    &.me{
      align-self: flex-end;
      p{
        align-self: flex-end;
        &:first-of-type{
          font-size: 0;
        }
        &:last-of-type{
          background-color: #fff;
          border-color: #00631c;
        }
      }
    }
  `,
  Message: styled.p`
    width: fit-content;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    word-break: break-all;
  `,
}