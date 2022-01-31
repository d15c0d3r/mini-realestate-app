import { Box, Center, VStack, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../components/home/loginform";
import nookies, { parseCookies } from "nookies";
import { parseToken } from "../helpers/parse-token";
import { sessionActions } from "../store";
import { useEffect } from "react";
import Head from "next/head";

const HomePage = (props) => {
  const { valid, token } = props;
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (valid) {
      dispatch(sessionActions.login(token));
    } else {
      dispatch(sessionActions.logout());
    }
  }, [dispatch, token, valid]);
  return (
    <>
      <Head>
        <title>Home | RealEstate</title>
        <meta
          name="description"
          content="This is the Login Page for the RealEstate website"
        />
      </Head>
      <Box>
        <VStack spacing={["50px", "50px", "45px", "20px"]}>
          <Box
            bgImage="/images/home.jpg"
            bgRepeat="no-repeat"
            bgPosition="center"
            h="70vh"
            w="100%"
            bgSize="1950px"
          >
            <Box display="flex" flexDir="row-reverse" h="100%">
              <Center w={["100%", "100%", "70%", "38%"]}>
                {!loggedIn && <LoginForm />}
              </Center>
            </Box>
          </Box>
          <Box>
            <Text fontSize={["30px", "30px", "40px", "60px"]}>
              Buy | Sell | Rent properties with ease.
            </Text>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export const getServerSideProps = async (Ctx) => {
  const { token } = parseCookies(Ctx);
  if (!token) {
    return {
      props: {
        valid: false,
      },
    };
  }
  const { valid, userDetails, message } = await parseToken(token);
  if (message) {
    return {
      notFound: true,
    };
  }
  if (!valid) {
    nookies.destroy(Ctx, "token");
    return {
      props: {
        valid,
      },
    };
  }
  return {
    props: {
      valid,
      token,
    },
  };
};

export default HomePage;
