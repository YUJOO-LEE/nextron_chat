import styled from 'styled-components';
import Textarea from '../../components/common/Textarea';
import GroupChatRoomContent from '../../components/groupchat/RoomContent';
import GroupChatRoomHeader from '../../components/groupchat/RoomHeader';

const GroupChatPage = () => {
  return (
    <Styled.Wrapper>
      <GroupChatRoomHeader />
      <GroupChatRoomContent />
      <Styled.InputMsg>
        <Textarea></Textarea>
      </Styled.InputMsg>
    </Styled.Wrapper>
  )
}

export default GroupChatPage;

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  InputMsg: styled.div`
    width: 100%;
    padding: 10px 10px 10px;
  `,
}