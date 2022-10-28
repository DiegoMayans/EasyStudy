import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogInCard from "../components/LogInCard";
import SignUpCard from "../components/SignUpCard";
import GlobalStateProvider from "../components/GlobalStateProvider";
import Script from "next/script";
import AppWrapper from "../components/AppWrapper";

declare global {
  interface Window {
    google: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const [isLoginHidden, setIsLogInHidden] = useState(true);
  const [isSignUpHidden, setIsSignUpHidden] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GlobalStateProvider>
      <div>
        <Head>
          <title>Easy Study App</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <Script id="google_script" src="https://accounts.google.com/gsi/client" async defer />
        <AppWrapper>
          <div>
            {!isLoginHidden && (
              <LogInCard
                setIsLogInHidden={setIsLogInHidden}
                setIsSignUpHidden={setIsSignUpHidden}
              />
            )}
            {!isSignUpHidden && (
              <SignUpCard
                setIsLogInHidden={setIsLogInHidden}
                setIsSignUpHidden={setIsSignUpHidden}
              />
            )}
          </div>

          <div className="min-w-[414px]">
            <Navbar setIsLogInHidden={setIsLogInHidden} />
            <div className="flex">
              <div className="bg-gray-50 w-[100%]">
                <Component {...pageProps} />
              </div>
            </div>
            <Footer />
          </div>
        </AppWrapper>
      </div>
    </GlobalStateProvider>
  );
}

export default MyApp;
