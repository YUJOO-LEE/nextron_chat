import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/authContext';
import { getChatRoomData, getDmRoomID } from '../../firebase/realtimeDB';
import { ChatRoomType } from '../../types/chatRoom';

const DmPage = () => {

  const { User } = useAuth();
  const router = useRouter();
  const { anotherUid } = router.query;
  const [DmRoomData, setDmRoomData] = useState<ChatRoomType>(null);

  useEffect(() => {
    const roomId = getDmRoomID(User.uid, anotherUid);
    getChatRoomData(roomId, setDmRoomData, true);
  }, []);

  console.log(DmRoomData);

  return (
    <div>DmPage</div>
  )
}

export default DmPage;