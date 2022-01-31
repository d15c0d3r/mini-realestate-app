import { Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import EditableControls from "../../components/ui/editablecontrols";
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
  VStack,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState, useReducer } from "react";
import nookies, { parseCookies } from "nookies";
import notificationReducer, {
  TURNON,
  initialNotificationState,
} from "../../store/reducers/notification-reducer";
import Cookies from "js-cookie";
import { parseToken } from "../../helpers/parse-token";
import { sessionActions } from "../../store/index";
import { useDispatch } from "react-redux";
import Head from "next/head";

function UserDetails(props) {
  const { valid, token, userDetails } = props;
  const { name, contact } = userDetails;
  const dispatch = useDispatch();
  const [notificationState1, notificationDispatch1] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  const [notificationState2, notificationDispatch2] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  const { message: msg1 } = notificationState1;
  const { message: msg2 } = notificationState2;
  const [contactInput, setContactInput] = useState(contact);
  const [nameInput, setNameInput] = useState(name);
  const [newPassInput, setNewPassInput] = useState("");
  const [retypeInput, setRetypeInput] = useState("");
  const [contactHelper, setContactHelper] = useState("");
  const [nameHelper, setNameHelper] = useState("");
  const [retypeHelper, setRetypeHelper] = useState("");

  useEffect(() => {
    if (valid) {
      dispatch(sessionActions.login(token));
    } else {
      dispatch(sessionActions.logout());
    }
  }, [dispatch, token, valid]);

  useEffect(() => {
    let timer;
    if (msg1) {
      const timer = setTimeout(() => {
        notificationDispatch1({ type: "OFF" });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [msg1]);

  useEffect(() => {
    let timer;
    if (msg2) {
      const timer = setTimeout(() => {
        notificationDispatch2({ type: "OFF" });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [msg2]);

  const onRetypeInputChange = (e) => {
    if (e.target.value !== newPassInput) {
      setRetypeHelper("Passwords doesn't match");
    } else {
      setRetypeHelper("");
    }
    setRetypeInput(e.target.value);
  };

  const onSubmitHandler1 = async (e) => {
    e.preventDefault();
    if (nameHelper !== "" || contactHelper !== "") {
      return;
    }
    const res = await fetch("api/update/contact-name", {
      method: "POST",
      body: JSON.stringify({
        name: nameInput,
        contact: contactInput,
        token: Cookies.get("token"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    res.ok
      ? notificationDispatch1({
          type: TURNON,
          payload: { message: data.message, status: "success" },
        })
      : notificationDispatch1({
          type: TURNON,
          payload: { message: data.message, status: "error" },
        });
  };

  const onSubmitHandler2 = async (e) => {
    e.preventDefault();
    if (newPassInput !== retypeInput) {
      setRetypeHelper("Passwords doesn't match");
      return;
    }
    const res = await fetch("api/update/password", {
      method: "POST",
      body: JSON.stringify({
        password: newPassInput,
        retypePassword: retypeInput,
        token: Cookies.get("token"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    res.ok
      ? notificationDispatch2({
          type: TURNON,
          payload: { message: data.message, status: "success" },
        })
      : notificationDispatch2({
          type: TURNON,
          payload: { message: data.message, status: "error" },
        });
  };

  return (
    <>
      <Head>
        <title>Update Details | RealEstate</title>
        <meta
          name="description"
          content="This is User Profile Page of a user where the user can update his contact information or update password"
        />
      </Head>
      <Flex
        w="100%"
        h="100%"
        mt="20px"
        mb="20px"
        alignItems={"center"}
        direction={"column"}
      >
        <Box
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
          w={["100%", "70%", "50%"]}
        >
          <Center w="100%" bg="#a5cdd4" p="6px" fontSize="30px" rounded="md">
            <Text>Edit Details</Text>
          </Center>

          <form onSubmit={onSubmitHandler1}>
            <Box bg="white" rounded="md" mt="20px" mb="5px">
              <FormControl as="fieldset" p="10px">
                <FormLabel htmlFor="name" fontWeight={"bold"} fontSize={"25px"}>
                  Name
                </FormLabel>
                <Editable
                  required
                  defaultValue={nameInput}
                  fontSize="2xl"
                  isPreviewFocusable={false}
                >
                  <EditablePreview />
                  <EditableInput
                    onChange={(e) => {
                      if (e.target.value.trim().length < 5) {
                        setNameHelper("Must have atleast 5 characters");
                      } else {
                        setNameHelper("");
                      }
                      setNameInput(e.target.value);
                    }}
                  />
                  <EditableControls />
                </Editable>
                <FormHelperText color={"red"}>{nameHelper}</FormHelperText>

                <FormLabel htmlFor="name" fontWeight={"bold"} fontSize={"25px"}>
                  Contact No
                </FormLabel>
                <Editable
                  defaultValue={contactInput}
                  fontSize="2xl"
                  isPreviewFocusable={false}
                >
                  <EditablePreview />
                  <EditableInput
                    onChange={(e) => {
                      if (e.target.value.trim().length != 10) {
                        setContactHelper("Must have atleast 10 characters");
                      } else {
                        setContactHelper("");
                      }
                      setContactInput(e.target.value);
                    }}
                  />
                  <EditableControls />
                </Editable>
                <FormHelperText color={"red"}>{contactHelper}</FormHelperText>
              </FormControl>
            </Box>
            <Center>
              <Button
                type="submit"
                bg="#a5cdd4"
                mb="10px"
                h="8vh"
                pr={"50%"}
                pl={"50%"}
                fontSize="20px"
              >
                Update Changes
              </Button>
            </Center>
          </form>
        </Box>
        {notificationState1.showNotification && (
          <Center>
            <Alert
              status={notificationState1.status}
              mt="30px"
              borderRadius={"10px"}
              pl="150px"
              pr="150px"
            >
              <VStack spacing={"10px"}>
                <AlertIcon />
                <AlertTitle w="100%" mt={4} mb={1} fontSize={["lg"]}>
                  {notificationState1.message}
                </AlertTitle>
              </VStack>
            </Alert>
          </Center>
        )}
      </Flex>

      <Flex
        w="100%"
        h="100%"
        mt="20px"
        mb="20px"
        alignItems={"center"}
        direction={"column"}
      >
        <Box
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
          w={["100%", "70%", "50%"]}
        >
          <Center w="100%" bg="#a5cdd4" p="6px" fontSize="30px" rounded="md">
            <Text>Change Password</Text>
          </Center>

          <form onSubmit={onSubmitHandler2}>
            <Box bg="white" rounded="md" mt="20px" mb="5px">
              <FormControl as="fieldset" p="10px">
                <FormLabel
                  htmlFor="newpassword"
                  fontWeight={"bold"}
                  fontSize={"25px"}
                >
                  New Password
                </FormLabel>
                <Input
                  id="newpassword"
                  type="password"
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  required
                />
                <FormLabel
                  htmlFor="retypenewpassword"
                  fontWeight={"bold"}
                  fontSize={"25px"}
                >
                  Re-type New Password
                </FormLabel>
                <Input
                  id="retypenewpassword"
                  type="password"
                  value={retypeInput}
                  onChange={onRetypeInputChange}
                  required
                />
                <FormHelperText color={"red"}>{retypeHelper}</FormHelperText>
              </FormControl>
            </Box>
            <Center>
              <Button
                type="submit"
                bg="#a5cdd4"
                mb="10px"
                h="8vh"
                pr={"50%"}
                pl={"50%"}
                fontSize="20px"
              >
                Update Changes
              </Button>
            </Center>
          </form>
        </Box>
        {notificationState2.showNotification && (
          <Center>
            <Alert
              status={notificationState2.status}
              mt="30px"
              borderRadius={"10px"}
              pl="150px"
              pr="150px"
            >
              <VStack spacing={"10px"}>
                <AlertIcon />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  {notificationState2.message}
                </AlertTitle>
              </VStack>
            </Alert>
          </Center>
        )}
      </Flex>
    </>
  );
}

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

export default UserDetails;
