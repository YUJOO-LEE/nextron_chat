import styled from "styled-components";

const GroupChatRoomHeader = ({ msgCount = 0 }: { msgCount?: number }) => {
  return (
    <Styled.Wrapper>
      <h2>방 이름</h2>
      <p>
        {msgCount} messages
      </p>
    </Styled.Wrapper>
  )
}

export default GroupChatRoomHeader;

const Styled = {
  Wrapper: styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;

    p{
      font-size: 14px;
    }
  `,
}