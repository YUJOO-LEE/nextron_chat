import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

const Button = ({ children, ...props }
  : ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren
  ) => {
  return (
    <Styled.Button {...props}>{children}</Styled.Button>
  )
}

export default Button;

const Styled = {
  Button: styled.button`
    position: relative;
    font-size: 14px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;

    &:disabled{
      text-indent: -99999px;
      opacity: 0.5;

      &::after{
        content: '';
        display: block;
        position: absolute;
        top: 8px;
        left: 130px;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,.3);
        border-top-color: #fff;
        animation: rotate-loading 1.5s linear 0s infinite normal;
      }

      @keyframes loading {
        0%  {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }

    &.big{
      padding: 10px;
      font-size: 16px;
    }

    &.gray{
      background-color: #efefef;
    }

    &.green{
      background-color: #00631c;
      color: #fff;
    }
  `,
}