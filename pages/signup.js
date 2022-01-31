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
  Flex,
  HStack,
  PinInput,
  PinInputField,
  VStack,
  AlertTitle,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import errorReducer, {
  CONTACT,
  RETYPEPASSWORD,
  initialErrorState,
} from "../store/reducers/error-reducer";
import notificationReducer, {
  TURNON,
  initialNotificationState,
} from "../store/reducers/notification-reducer";
import Head from "next/head";

const SignupPage = (props) => {
  const router = useRouter();

  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  const { message } = notificationState;
  const [errorState, errorDispatch] = useReducer(
    errorReducer,
    initialErrorState
  );
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [retypePasswordInput, setRetypePasswordInput] = useState("");
  const [otpInput, setOtpInput] = useState("");

  useEffect(() => {
    let timer;
    if (message === "Signed Up") {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
    } else if (message !== "Enter OTP sent to your email") {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "OFF" });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message, router]);

  const onContactInputChange = (e) => {
    {
      e.target.value.length !== 10
        ? errorDispatch({
            type: CONTACT,
            payload: "Contact must be 10 digit number",
          })
        : errorDispatch({ type: CONTACT, payload: "" });
    }
    setContactInput(e.target.value);
  };

  const onRetypePasswordInputChange = (e) => {
    {
      passwordInput !== e.target.value
        ? errorDispatch({
            type: RETYPEPASSWORD,
            payload: "Passwords didn't match",
          })
        : errorDispatch({ type: RETYPEPASSWORD, payload: "" });
    }

    setRetypePasswordInput(e.target.value);
  };

  const onSignupFormSubmitHandler = async (e) => {
    e.preventDefault();
    const reqBody = {
      email: emailInput,
      name: nameInput,
      contact: contactInput,
      password: passwordInput,
    };
    const res = await fetch("api/signup/check-user-exists-n-send-otp", {
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
          payload: { message: data.message, status: "success" },
        })
      : notificationDispatch({
          type: TURNON,
          payload: { message: data.message, status: "error" },
        });
  };

  const onOtpFormSubmitHandler = async (e) => {
    e.preventDefault();
    const reqBody = {
      email: emailInput,
      name: nameInput,
      contact: contactInput,
      password: passwordInput,
      otp: otpInput,
    };
    const res = await fetch("/api/signup/verify-otp-n-signup", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    res.ok
      ? notificationDispatch({
          type: TURNON,
          payload: { message: data.message, status: "success" },
        })
      : notificationDispatch({
          type: TURNON,
          payload: { message: data.message, status: "error" },
        });
  };

  return (
    <>
      <Head>
        <title>Signup | RealEstate</title>
        <meta
          name="description"
          content="This is the signup page for the RealEstate website"
        />
      </Head>
      <Flex
        w="100%"
        h="100%"
        mt="20px"
        mb="20px"
        align="center"
        direction="column"
      >
        <Box
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
          w={["100%", "70%", "50%"]}
        >
          <Center w="100%" bg="#a5cdd4" p="6px" fontSize="30px" rounded="md">
            <Text>Signup</Text>
          </Center>

          <form onSubmit={onSignupFormSubmitHandler}>
            <Box bg="white" rounded="md" mt="20px" mb="5px">
              <FormControl as="fieldset" p="10px">
                <FormLabel
                  htmlFor="email"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  Email
                </FormLabel>
                <Input
                  value={emailInput}
                  id="email"
                  type="text"
                  required
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                />
                <FormHelperText color={"red"}>
                  {errorState.email}
                </FormHelperText>
                <FormLabel htmlFor="name" fontWeight={"bold"} fontSize={"20px"}>
                  Name
                </FormLabel>
                <Input
                  value={nameInput}
                  id="name"
                  type="text"
                  required
                  onChange={(e) => {
                    setNameInput(e.target.value);
                  }}
                />
                <FormHelperText color={"red"}>{errorState.name}</FormHelperText>

                <FormLabel
                  htmlFor="contact"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  Contact No
                </FormLabel>
                <Input
                  value={contactInput}
                  id="contact"
                  type="number"
                  required
                  onChange={onContactInputChange}
                />
                <FormHelperText color={"red"}>
                  {errorState.contact}
                </FormHelperText>

                <FormLabel
                  htmlFor="actualPass"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  Password
                </FormLabel>
                <Input
                  value={passwordInput}
                  required
                  id="actualPass"
                  type="password"
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <FormHelperText>{errorState.password}</FormHelperText>

                <FormLabel
                  htmlFor="retypePass"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  Re-Type Password
                </FormLabel>
                <Input
                  required
                  value={retypePasswordInput}
                  id="retypePass"
                  type="password"
                  onChange={onRetypePasswordInputChange}
                />
                <FormHelperText color={"red"}>
                  {errorState.retypePasswod}
                </FormHelperText>
                <Center>
                  <FormHelperText color={"grey"}>
                    An OTP will be sent to your email for verification process
                    and the OTP form will be displayed below after sumbitting
                    the signup form
                  </FormHelperText>
                </Center>
              </FormControl>
            </Box>
            <Center>
              <Button
                type="submit"
                bg="#a5cdd4"
                mb="10px"
                pl="50%"
                pr="50%"
                fontSize="20px"
                h="8vh"
              >
                Submit
              </Button>
            </Center>
          </form>

          <Center
            w="100%"
            bg="#262829"
            p="6px"
            fontSize={["10px", "15px", "20px", "30px"]}
            rounded="md"
          >
            <Text color="white">
              Already Signed up? Login <Link href="/"> here! </Link>
            </Text>
          </Center>
        </Box>
        {notificationState.showNotification && (
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
                            onChange={(value) => setOtpInput(value)}
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
        )}
      </Flex>
    </>
  );
};

export const getStaticProps = () => {
  return {
    props: {},
  };
};

export default SignupPage;
