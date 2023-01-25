import { PropsWithChildren, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

const Textarea = ({ 
  children, ...props 
}: TextareaHTMLAttributes<HTMLTextAreaElement> & PropsWithChildren
) => {
  return (
    <Styled.Textarea {...props}>
      {children}
    </Styled.Textarea>
  )
}

export default Textarea;

const Styled = {
  Textarea: styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: #fff;
    resize: none;
    font-family: inherit;
    font-size: 14px;
  `,
}