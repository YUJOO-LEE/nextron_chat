import { ChangeEvent, FormEventHandler, KeyboardEventHandler, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../firebase/authContext';
import { addNewMessage } from '../../firebase/realtimeDB';
import Button from './Button';
import Textarea from './Textarea';

const MessageInput = ({ roomId }: { roomId: string }) => {

  const { User } = useAuth();
  const [Message, setMessage] = useState<string>('');
  const [Loading, setLoading] = useState<boolean>(false);

  // textarea 엔터 입력 이벤트
  const handleKeydown: KeyboardEventHandler = (e) => {
    if (!(e.code === 'Enter' && !e.shiftKey)) return;
    e.preventDefault();
    handleAddNewMessage();
  }

  // from submit 이벤트
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleAddNewMessage();
  }

  // 신규 메세지 저장 실행
  const handleAddNewMessage = async () => {
    if (!Message || Loading) return;
    setLoading(true);

    try {
      await addNewMessage(roomId, User, Message);
      setMessage('');
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Styled.InputMsg onSubmit={handleSubmit}>
      <Textarea 
        value={Message} 
        onInput={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} 
        onKeyDown={handleKeydown}
      />
      <Button className='green' disabled={Loading}>
        전송
      </Button>
    </Styled.InputMsg>
  )
}

export default MessageInput;

const Styled = {
  InputMsg: styled.form`
    width: 100%;
    padding: 10px;
    display: flex;
    gap: 10px;

    button{
      width: 45px;
      white-space: nowrap;
    }
  `,
}