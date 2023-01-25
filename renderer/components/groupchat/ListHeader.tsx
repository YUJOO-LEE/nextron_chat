import styled from "styled-components";
import Button from "../common/Button";

const GroupChatHeader = ({ totalCount = 0 }: { totalCount?: number}) => {
  return (
    <div>
      <h1>그룹 채팅</h1>
      <Styled.Wrapper>
        <p><strong>{totalCount}</strong> rooms</p>
        <Button type='button' className='gray'>방 만들기</Button>
      </Styled.Wrapper>
    </div>
  )
}

export default GroupChatHeader;

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    p{
      font-size: 14px;
    }
  `,
  RoomInfo: styled.div`
    
  `,
}