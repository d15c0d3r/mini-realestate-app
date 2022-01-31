import {
  Box,
  Center,
  Text,
  VStack,
  Alert,
  AlertTitle,
  AlertIcon,
} from "@chakra-ui/react";
import nookies, { parseCookies } from "nookies";
import Card from "../../components/ui/card";
import { fetchUserUploads } from "../../helpers/fetch-user-uploads";
import { parseToken } from "../../helpers/parse-token";
import { sessionActions } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Head from "next/head";

const UserUploadsPage = (props) => {
  const { valid, token, userUploads } = props;
  const dispatch = useDispatch();
  const UPLOADS = JSON.parse(userUploads);
  const [uploads, setUploads] = useState(UPLOADS);

  const setUploadsHandler = (id) => {
    setUploads((prevUploads) =>
      prevUploads.filter((prevUpload) => prevUpload.ID !== id)
    );
  };

  useEffect(() => {
    if (valid) {
      dispatch(sessionActions.login(token));
    } else {
      dispatch(sessionActions.logout());
    }
  }, [dispatch, token,valid]);

  if (uploads.length === 0) {
    return (
      <>
        <Head>
          <title>My Uploads | RealEstate</title>
          <meta
            name="description"
            content="This is Uploads Page of a user who uploaded the land details to sell."
          />
        </Head>
        <Center w="100%" h="50vh">
          <Center>
            <Alert
              status="warning"
              mt="30px"
              borderRadius={"10px"}
              pl="150px"
              pr="150px"
            >
              <VStack spacing={"10px"}>
                <AlertIcon />
                <AlertTitle mt={4} mb={1} fontSize={["sm", "md", "lg", "lg"]}>
                  {"Seems that you haven't uploaded any details yet"}
                </AlertTitle>
              </VStack>
            </Alert>
          </Center>
        </Center>
      </>
    );
  }

  return (
    <>
      <Center w="100%" h="100%" mt="20px" mb="20px">
        <Box
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
          w={["100%", "70%", "50%"]}
        >
          <Center w="100%" bg="#a5cdd4" p="6px" fontSize="30px" rounded="md">
            <Text>My Uploads</Text>
          </Center>
        </Box>
      </Center>
      <Center>
        <VStack w={["100%", "100%", "70%", "50%"]} spacing="25px" mb="50px">
          {uploads.map((upload) => (
            <Card
              setUploadsHandler={setUploadsHandler}
              key={upload.ID}
              id={upload.ID}
              name={upload.NAME}
              country={upload.COUNTRY}
              state={upload.STATE}
              city={upload.CITY}
              landmark={upload.LANDMARK}
              pincode={upload.PINCODE}
              contact={upload.CONTACT}
              email={upload.EMAIL}
              displayDelete={true}
            />
          ))}
        </VStack>
      </Center>
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
      notFound: true,
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
  const { email } = userDetails;
  const result = await fetchUserUploads(email);
  if (result === " error") {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      valid,
      token,
      userUploads: JSON.stringify(result),
    },
  };
};

export default UserUploadsPage;
