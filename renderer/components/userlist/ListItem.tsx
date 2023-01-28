import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAuth } from '../../firebase/authContext';
import { checkRoomData, getDmRoomID, setNewDmRoom } from '../../firebase/realtimeDB';
import { UserType } from '../../types/user';

const UserListItem = (userData: Pick<UserType, 'uid' | 'displayName' | 'photoURL'>
) => {
  const { uid, displayName, photoURL } = userData;
  const { User } = useAuth();
  const roomId = getDmRoomID(User.uid, uid);
  const router = useRouter();

  // DM 버튼 클릭 이벤트
  const handleDm = async () => {
    const roomData = await checkRoomData(roomId);
    if (!roomData) {  // 방 없을 시 신규 생성
      await setNewDmRoom(User, userData);
    }

    // DM 방으로 이동
    router.push('/directmsg/' + uid);
  }

  return (
    <Styled.Item>
      <Styled.Icon>
        <img src={photoURL} alt={displayName} />
      </Styled.Icon>
      <Styled.Content>
        <Styled.Title>
          {displayName}
        </Styled.Title>
        <Styled.DmBtn onClick={handleDm} />
      </Styled.Content>
    </Styled.Item>
  )
}

export default UserListItem;

const Styled = {
  Item: styled.li`
    position: relative;
    width: 100%;
  `,
  Icon: styled.p`
    position: absolute;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #00631c;
    background-color: #fff;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  Content: styled.p`
    margin: 5px 0 5px 30px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 10px 10px 30px;
  `,
  Title: styled.span`
    flex: 1;
    color: #444;
  `,
  DmBtn: styled.i`
    display: block;
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3csvg viewBox='-1 -1 26 26' fill='%23666' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z'/%3e%3c/svg%3e");
    cursor: pointer;
  `,
}