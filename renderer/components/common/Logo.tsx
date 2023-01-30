import styled from 'styled-components';

const Logo = () => {
  return (
    <Styled.Wrapper>
      <Styled.Logo src='/images/logo.png' alt='YUJOO CHAT' />
      <h1>YUJOO CHAT</h1>
    </Styled.Wrapper>
  )
}

export default Logo;

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: #fff;
  `,
  Logo: styled.img`
    width: 128px;
    height: 128px;
  `,
}