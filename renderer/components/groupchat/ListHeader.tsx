import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';
import { StyledModal } from '../common/Modal';

const GroupChatHeader = ({ totalCount = 0 }: { totalCount?: number}) => {

  const roomNameInput = useRef<HTMLInputElement>(null);
  const [ModalShown, toggleModal] = useState<boolean>(false);
  const [RoomName, setRoomName] = useState<string>('');

  // 방 만들기 버튼 클릭시 모달 출력
  const onClickAddRoomBtn = () => {
    toggleModal(true);
  }

  const handleAddRoom: MouseEventHandler<HTMLButtonElement> = () => {
    const inputElment = roomNameInput.current.firstElementChild;
    if (!RoomName) {
      inputElment.classList.add('error');
      return;
    };

    inputElment.classList.remove('error');

    // 저장
  }

  return (
    <div>
      <h1>그룹 채팅</h1>
      <Styled.Wrapper>
        <p><strong>{totalCount}</strong> rooms</p>
        <Button type='button' className='gray' onClick={onClickAddRoomBtn}>
          방 만들기
        </Button>
      </Styled.Wrapper>

      <StyledModal
        show={ModalShown}
        toggleShow={toggleModal}
        eventName='확인'
        eventHandler={handleAddRoom}
      >
        <Styled.ModalInner>
          <h2>방 만들기</h2>
          <div ref={roomNameInput}>
            <Input type='text' placeholder='방 제목을 입력하세요' 
              value={RoomName}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
            />
          </div>
        </Styled.ModalInner>
      </StyledModal>
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
  ModalInner: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    >div{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
}