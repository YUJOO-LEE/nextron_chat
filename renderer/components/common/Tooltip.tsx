import { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = {
  top?: string;
  left?: string;
}

const Tooltip = ({children, ...props}: PropsWithChildren & Props) => {
  return (
    <Styled.Wrapper {...props} className='tooltip'>
      <Styled.Inner>
        {children}
      </Styled.Inner>
    </Styled.Wrapper>
  )
}

export default Tooltip;

const Styled = {
  Wrapper: styled.span<Props>`
    width: max-content;
    height: 100%;
    padding-left: 10px;
    display: none;
    align-items: center;
    position: absolute;
    top: ${props => props.top || '0'};
    left: ${props => props.left || '0'};
    user-select: none;
  `,
  Inner: styled.span`
    padding: 5px;
    font-size: 14px;
    border: 1px solid #00631c;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);

    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      width: 0;
      height: 0;
      border-bottom: 4px solid transparent;
      border-top: 4px solid transparent;
      border-left: 6px solid transparent;
      border-right: 6px solid rgba(255, 255, 255, 0.5);
      transform: translate(-100%, -50%);
    }
  `,
}