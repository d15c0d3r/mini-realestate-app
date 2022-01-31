import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/layout";
import { Provider } from "react-redux";
import store from "../store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="This is a RealEstate website where clients can get details of the properties which are on sale or they can upload their land details which they want to sell."
        />
      </Head>
      <Provider store={store}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
