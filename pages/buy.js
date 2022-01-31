import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState, useReducer } from "react";
import BuyForm from "../components/buy/buyform";
import BuySearchResult from "../components/buy/buysearchresult";
import nookies, { parseCookies } from "nookies";
import notificationReducer, {
  TURNON,
  initialNotificationState,
} from "../store/reducers/notification-reducer";
import { parseToken } from "../helpers/parse-token";
import { sessionActions } from "../store/index";
import { useDispatch } from "react-redux";
import Head from "next/head";

const BuyPage = (props) => {
  const [sites, setSites] = useState([]);
  const { valid, token, userDetails } = props;
  const dispatch = useDispatch();

  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  const { showNotification, message, status } = notificationState;

  useEffect(() => {
    if (valid) {
      dispatch(sessionActions.login(token));
    } else {
      dispatch(sessionActions.logout());
    }
  }, [dispatch, token, valid]);

  useEffect(() => {
    let timer;
    if (message) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "OFF" });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <>
      <Head>
        <title>Buy | RealEstate</title>
        <meta
          name="description"
          content="This is Buy page of RealEstate website where users can fetch the details of the lands which are on sale."
        />
      </Head>
      <Flex align={"center"} direction={"column"}>
        <BuyForm
          setSites={setSites}
          userDetails={userDetails}
          notificationDispatch={notificationDispatch}
          TURNON={TURNON}
        />
      </Flex>
      <Box mt="50px">
        <BuySearchResult
          sites={sites}
          showNotification={showNotification}
          message={message}
          status={status}
        />
      </Box>
    </>
  );
};

export const getServerSideProps = async (Ctx) => {
  const { token } = parseCookies(Ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const { valid, userDetails, message } = await parseToken(token);
  if (message) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  if (!valid) {
    nookies.destroy(Ctx, "token");
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      valid,
      token,
      userDetails,
    },
  };
};

export default BuyPage;
