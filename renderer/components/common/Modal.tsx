import { Dispatch, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Button from './Button';

const Modal = ({ children }: PropsWithChildren) => {
  return createPortal(children, document.getElementById('modal-root')!);
}

export const ErrorModal = ({ 
  show, toggleShow, children
}: { 
  show: boolean,
  toggleShow: Dispatch<React.SetStateAction<boolean>>
} & PropsWithChildren) => {
  return show ? (
    <Modal>
      <Styled.Wrapper>
        <Styled.Modal>
          <Styled.Content>{children}</Styled.Content>
          <Button className='yellow' onClick={() => toggleShow(false)}>Close</Button>
        </Styled.Modal>
      </Styled.Wrapper>
    </Modal>
  ) : null ;
}

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Modal: styled.div`
    min-width: 320px;
    min-height: 220px;
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
    text-align: center;
    font-size: 16px;
  `,
}