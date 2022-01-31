import {
  Box,
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Alert,
  AlertIcon,
  HStack,
  PinInput,
  PinInputField,
  VStack,
  AlertTitle,
} from "@chakra-ui/react";
import { useReducer, useState, useEffect } from "react";
import notificationReducer, {
  TURNON,
  initialNotificationState,
} from "../store/reducers/notification-reducer";
import Head from "next/head";

const ForgotPasswordPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  const { showNotification } = notificationState;

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        notificationDispatch({ type: "OFF" });
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showNotification]);

  const onEmailInputChange = (e) => {
    notificationDispatch({ type: "OFF" });
    setEmailInput(e.target.value);
  };

  const onForgotPasswordFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email: emailInput }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    res.ok
      ? notificationDispatch({
          type: TURNON,
          payload: { status: "success", message: data.message },
        })
      : notificationDispatch({
          type: TURNON,
          payload: { status: "error", message: data.message },
        });
  };
  return (
    <>
      <Head>
        <title>ForgotPassword | RealEstate</title>
        <meta
          name="description"
          content="This is the Forgot Password page of RealEstate website where users can recover their password"
        />
      </Head>
      <VStack>
        <Center w="100%">
          <Box w={["100%", "100%", "100%", "40%"]} mt={"10px"}>
            <Box
              boxShadow="dark-lg"
              p="6"
              rounded="md"
              bg="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
            >
              <Center
                w="100%"
                bg="#a5cdd4"
                p="6px"
                fontSize="30px"
                rounded="md"
              >
                <Text>Forgot Pasword</Text>
              </Center>
              <form onSubmit={onForgotPasswordFormSubmit}>
                <Box bg="white" rounded="md" mt="20px" mb="20px">
                  <FormControl as="fieldset" p="10px">
                    <FormLabel
                      htmlFor="email"
                      fontWeight={"bold"}
                      fontSize={"20px"}
                    >
                      Email Address
                    </FormLabel>
                    <Input
                      id="email"
                      type="email"
                      required
                      onChange={onEmailInputChange}
                      value={emailInput}
                    />
                    <FormHelperText>Email Helper Text</FormHelperText>
                  </FormControl>
                </Box>
                <Center>
                  <Button
                    type="submit"
                    bg="#262829"
                    mb="10px"
                    pl="50%"
                    pr="50%"
                    h="8vh"
                    fontSize="20px"
                    color={"white"}
                    _hover={{}}
                  >
                    Submit
                  </Button>
                </Center>
              </form>
            </Box>
          </Box>
        </Center>
        {notificationState.showNotification && (
          <Center w="50%">
            <Center>
              <Alert
                status={notificationState.status}
                mt="30px"
                borderRadius={"10px"}
                pl="150px"
                pr="150px"
              >
                <VStack spacing={"10px"}>
                  <AlertIcon />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    {notificationState.message}
                  </AlertTitle>
                  {notificationState.message ===
                    "Enter OTP sent to your email" && (
                    <form onSubmit={onOtpFormSubmitHandler}>
                      <>
                        <Box borderRadius={"10px"}>
                          <HStack>
                            <PinInput
                              value={otpInput}
                              type="alphanumeric"
                              mask
                              onChange={onOtpInputChange}
                            >
                              <PinInputField bg="#81d697" />
                              <PinInputField bg="#81d697" />
                              <PinInputField bg="#81d697" />
                              <PinInputField bg="#81d697" />
                            </PinInput>
                          </HStack>
                        </Box>
                        <Button
                          type="submit"
                          bg="#1e241f"
                          mb="10px"
                          mt="10px"
                          w="100%"
                          fontSize="20px"
                          h="8vh"
                          textColor={"white"}
                          _hover={{}}
                        >
                          Submit
                        </Button>
                      </>
                    </form>
                  )}
                </VStack>
              </Alert>
            </Center>
          </Center>
        )}
      </VStack>
    </>
  );
};

export const getStaticProps = () => {
  return {
    props: {},
  };
};

export default ForgotPasswordPage;
