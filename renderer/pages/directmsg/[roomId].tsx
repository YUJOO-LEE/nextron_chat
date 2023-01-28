import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MessageInput from '../../components/common/MessageInput';
import Messages from '../../components/common/Messages';
import DmRoomHeader from '../../components/directmsg/RoomHeader';
import { getChatRoomData } from '../../firebase/realtimeDB';
import { DmRoomType } from '../../types/chatRoom';

const DmPage = () => {

  const router = useRouter();
  const { roomId } = router.query;
  const stringRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const [DmRoomData, setDmRoomData] = useState<DmRoomType>(null);

  useEffect(() => {
    getChatRoomData(stringRoomId, setDmRoomData, true);
  }, []);

  return (
    <Styled.Wrapper>
      {DmRoomData && <>
        <DmRoomHeader {...DmRoomData} />
        <Messages roomId={stringRoomId} />
        <MessageInput roomId={stringRoomId} />
      </>}
    </Styled.Wrapper>
  )
}

export default DmPage;

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
}