import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../config/GlobalStyle';
import { AuthContextProvider } from '../context/authContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/common/ProtectedRoute';
import UnProtectedRoute from '../components/common/UnProtectedRoute';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const noAuthRequired = ['/', '/home', '/signup'];

  return (
    <AuthContextProvider>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head> 
      <GlobalStyle />

      {noAuthRequired.includes(router.pathname) ? (
        <UnProtectedRoute>
          <Component {...pageProps} />
        </UnProtectedRoute>
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
