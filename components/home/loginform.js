import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  Box,
  Text,
  Center,
  Button,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useReducer } from "react";
import notificationReducer, {
  TURNON,
  initialNotificationState,
} from "../../store/reducers/notification-reducer";
import { useDispatch } from "react-redux";
import { sessionActions } from "../../store";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );

  const onEmailInputChange = (e) => {
    if (notificationState.showNotification)
      notificationDispatch({ type: "OFF" });
    setEmailInput(e.target.value);
  };

  const onPasswordInputChange = (e) => {
    if (notificationState.showNotification)
      notificationDispatch({ type: "OFF" });
    setPasswordInput(e.target.value);
  };

  const onLoginFormSubmit = async (e) => {
    e.preventDefault();
    if (notificationState.showNotification)
      notificationDispatch({ type: "OFF" });
    const reqBody = {
      email: emailInput,
      password: passwordInput,
    };

    const res = await fetch("/api/login/check-user-exists", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const { status, message, token } = data;
    if (res.ok) {
      dispatch(sessionActions.login(token));
    } else {
      notificationDispatch({ type: TURNON, payload: { status, message } });
    }
  };

  return (
    <>
      <Box
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
        w="100%"
      >
        <Center w="100%" bg="#a5cdd4" p="6px" fontSize="30px" rounded="md">
          <Text>Login Here</Text>
        </Center>
        <form onSubmit={onLoginFormSubmit}>
          <Box bg="white" rounded="md" mt="20px" mb="20px">
            <FormControl as="fieldset" p="10px">
              <FormLabel htmlFor="phone" fontWeight={"bold"} fontSize={"20px"}>
                Email Address
              </FormLabel>
              <Input
                id="email"
                type="email"
                required
                onChange={onEmailInputChange}
                value={emailInput}
              />
              <FormHelperText color={"red"}>
                {notificationState.showNotification &&
                  notificationState.status === "email" &&
                  notificationState.message}
              </FormHelperText>

              <FormLabel
                htmlFor="password"
                fontWeight={"bold"}
                fontSize={"20px"}
              >
                Password
              </FormLabel>
              <Input
                id="password"
                type="password"
                required
                onChange={onPasswordInputChange}
                value={passwordInput}
              />
              <FormHelperText color={"red"}>
                {notificationState.showNotification &&
                  notificationState.status === "password" &&
                  notificationState.message}
              </FormHelperText>
            </FormControl>
          </Box>
          <Button
            type="submit"
            bg="#262829"
            mb="10px"
            h="7vh"
            w="100%"
            fontSize="30px"
            color="white"
            _hover={{}}
          >
            Submit
          </Button>
        </form>
        <VStack>
          <Center w="100%" bg="#a5cdd4" p="6px" fontSize="30px" rounded="md">
            <Text color="black">
              <Link href="/forgot-password"> Forgot Password </Link>
            </Text>
          </Center>

          <Center
            w="100%"
            bg="#262829"
            p="6px"
            fontSize={["20px", "20px", "20px", "30px"]}
            rounded="md"
          >
            <Text color="white">
              Havent Signed up yet? do it <Link href="/signup"> here! </Link>
            </Text>
          </Center>
        </VStack>
      </Box>
    </>
  );
};

export default LoginForm;
