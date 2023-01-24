import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Wrapper>
      <Header />
      <Styled.Contents>
        {children}
      </Styled.Contents>
    </Styled.Wrapper>
  )
}

export default Layout;

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
  `,
  Contents: styled.main`
    margin-left: 60px;
    flex: 1;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    h1{
      text-align: center;
      margin-bottom: 20px;
    }
  `,
}