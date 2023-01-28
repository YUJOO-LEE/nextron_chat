import { useRouter } from 'next/router';
import styled from 'styled-components';
import MessageInput from '../../components/common/MessageInput';
import GroupChatRoomContent from '../../components/groupchat/RoomContent';
import GroupChatRoomHeader from '../../components/groupchat/RoomHeader';

const GroupChatPage = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const stringRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  return (
    <Styled.Wrapper>
      <GroupChatRoomHeader roomId={stringRoomId} />
      <GroupChatRoomContent roomId={stringRoomId} />
      <MessageInput roomId={stringRoomId} />
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