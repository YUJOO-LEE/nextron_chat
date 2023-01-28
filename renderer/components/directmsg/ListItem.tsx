import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const DmListItem = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Item>
      <Styled.Title>
        {children}
      </Styled.Title>
    </Styled.Item>
  )
}

export default DmListItem;

const Styled = {
  Item: styled.li`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  `,
  Title: styled.p`
    flex: 1;
    color: #444;
  `,
}