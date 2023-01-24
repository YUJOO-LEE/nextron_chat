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
    font-size: 14px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;

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