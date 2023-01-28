import styled from 'styled-components';
import MessageInput from '../../components/groupchat/MessageInput';
import GroupChatRoomContent from '../../components/groupchat/RoomContent';
import GroupChatRoomHeader from '../../components/groupchat/RoomHeader';

const GroupChatPage = () => {
  return (
    <Styled.Wrapper>
      <GroupChatRoomHeader />
      <GroupChatRoomContent />
      <MessageInput />
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
}