import styled from 'styled-components';

const GroupChatRoomContent = () => {
  return (
    <Styled.ListWrapper>
      <Styled.ListItem>
        <p>
          UserName
          <span>time</span>
        </p>
        <Styled.Message>Message!</Styled.Message>
      </Styled.ListItem>
        <Styled.ListItem>
          <p>
            UserName
            <span>time</span>
          </p>
          <Styled.Message>Message!</Styled.Message>
        </Styled.ListItem>
        <Styled.ListItem>
          <p>
            UserName
            <span>time</span>
          </p>
          <Styled.Message>Message!</Styled.Message>
        </Styled.ListItem>
        <Styled.ListItem>
          <p>
            UserName
            <span>time</span>
          </p>
          <Styled.Message>Message!Message!Message!Message!Message!Message!Message!Message!Message!Message!Message!Message!Message!Message!Message!Message!</Styled.Message>
        </Styled.ListItem>
      <Styled.ListItem>
        <p>
          UserName
          <span>time</span>
        </p>
        <Styled.Message>Message!</Styled.Message>
      </Styled.ListItem>
      <Styled.ListItem>
        <p>
          UserName
          <span>time</span>
        </p>
        <Styled.Message>Message!</Styled.Message>
      </Styled.ListItem>
      <Styled.ListItem className='me'>
        <p>
          UserName
          <span>time</span>
        </p>
        <Styled.Message>Message!</Styled.Message>
      </Styled.ListItem>
      <Styled.ListItem className='me'>
        <p>
          UserName
          <span>time</span>
        </p>
        <Styled.Message>Message!</Styled.Message>
      </Styled.ListItem>
      <Styled.ListItem className='me'>
        <p>
          UserName
          <span>time</span>
        </p>
        <Styled.Message>Message!</Styled.Message>
      </Styled.ListItem>
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