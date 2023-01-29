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
    display: flex;
    justify-content: space-between;
    -user-select: none;
  `,
  Contents: styled.main`
    margin-left: 70px;
    flex: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .inner{
      width: 100%;
      height: 100%;
      padding: 20px;
    }

    h1{
      text-align: center;
      margin-bottom: 20px;
    }
  `,
}