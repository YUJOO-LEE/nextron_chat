import { Dispatch, MouseEventHandler, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Button from './Button';

const Modal = ({ children }: PropsWithChildren) => {
  return createPortal(children, document.getElementById('modal-root')!);
}

export const StyledModal = ({ 
  show, toggleShow, children, eventHandler, eventName
}: { 
  show: boolean;
  toggleShow: Dispatch<React.SetStateAction<boolean>>;
  eventHandler?: MouseEventHandler<HTMLButtonElement>;
  eventName?: string
} & PropsWithChildren) => {
  if (show) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return show ? (
    <Modal>
      <Styled.Wrapper>
        <Styled.Modal>
          <Styled.Content>{children}</Styled.Content>
          <Styled.Btns>
            <Button className='gray' onClick={() => toggleShow(false)}>
              {eventHandler ? '취소' : '닫기'}
            </Button>
            {eventHandler && 
              <Button className='green' onClick={eventHandler}>
                {eventName}
              </Button>}
          </Styled.Btns>
        </Styled.Modal>
      </Styled.Wrapper>
    </Modal>
  ) : null ;
}

const Styled = {
  Wrapper: styled.div`
    -webkit-app-region: no-drag;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Modal: styled.div`
    min-width: 220px;
    min-height: 120px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: showModal 0.1s linear 1 both;
    
    @keyframes showModal{
      0%{ 
        opacity: 0;
        transform: translateY(30%);
      }
      100%{
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
  `,
  Btns: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    button{
      width: 100%;
    }
  `,
}