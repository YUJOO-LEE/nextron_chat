import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../config/GlobalStyle';
import { AuthContextProvider } from '../context/authContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/common/ProtectedRoute';
import UnProtectedRoute from '../components/common/UnProtectedRoute';
import Layout from '../components/common/Layout';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const noAuthRequired = ['/', '/home', '/signup'];

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head> 
      <GlobalStyle />

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
