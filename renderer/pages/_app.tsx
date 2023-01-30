import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../config/GlobalStyle';
import { AuthContextProvider } from '../firebase/authContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/common/ProtectedRoute';
import UnProtectedRoute from '../components/common/UnProtectedRoute';
import Layout from '../components/common/Layout';
import Logo from '../components/common/Logo';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const noAuthRequired = ['/', '/home', '/signup'];
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      logoRef.current.style.display = 'none';
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head> 
      <GlobalStyle />

      <Styled.Wrapper ref={logoRef}>
        <Logo />
      </Styled.Wrapper>
      <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <UnProtectedRoute>
          <Component {...pageProps} />
        </UnProtectedRoute>
      ) : (
        <ProtectedRoute>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectedRoute>
      )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: ani 2s linear forwards;
    
    @keyframes ani {
      75%{
        opacity: 1;
      }
      100%{
        opacity: 0;
      }
    }
  `,
}