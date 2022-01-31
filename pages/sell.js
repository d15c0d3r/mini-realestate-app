import { useEffect, useState, useReducer } from "react";
import {
  Box,
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  RadioGroup,
  Radio,
  Stack,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";
import Countries from "../components/ui/countries";
import nookies, { parseCookies } from "nookies";
import { useDispatch } from "react-redux";
import { sessionActions } from "../store/index";
import notificationReducer, {
  TURNON,
  initialNotificationState,
} from "../store/reducers/notification-reducer";
import { parseToken } from "../helpers/parse-token";
import Head from "next/head";

const SellPage = (props) => {
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  const { valid, token, userDetails } = props;
  const dispatch = useDispatch();
  const { message } = notificationState;
  const [countryInput, setCountryInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [landTypeInput, setLandTypeInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [pinCodeInput, setPinCodeInput] = useState("");
  const [landMarkInput, setLandMarkInput] = useState("");
  const [pinHelperText, setPinHelperText] = useState("");
  const [landMarkHelper, setLandMarkHelper] = useState("");
  const [cityHelperText, setCityHelperText] = useState("");
  const [stateHelperText, setStateHelperText] = useState("");
  const [landTypeHelper, setLandTypeHelper] = useState("");

  useEffect(() => {
    if (valid) {
      dispatch(sessionActions.login(token));
    } else {
      dispatch(sessionActions.logout());
    }
  }, [valid, dispatch, token]);

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

  const onSellFormSubmit = async (e) => {
    e.preventDefault();
    if (
      cityHelperText !== "" ||
      pinHelperText !== "" ||
      landMarkHelper !== "" ||
      stateHelperText !== ""
    ) {
      return;
    }
    if (landTypeInput === "") {
      setLandTypeHelper("Type of land is required!");
      return;
    }

    const reqBody = {
      country: countryInput,
      state: stateInput,
      landType: landTypeInput,
      city: cityInput,
      pincode: pinCodeInput,
      landmark: landMarkInput,
      token,
      email: userDetails.email,
      contact: userDetails.contact,
      name: userDetails.name,
    };

    const res = await fetch("api/submit-sellform", {
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

  const onStateInputChange = (e) => {
    if (e.target.value.trim().length < 5) {
      setStateHelperText("Must have atleast 5 characters");
    } else {
      setStateHelperText("");
    }
    setStateInput(e.target.value);
  };

  const onCityInputChange = (e) => {
    if (e.target.value.trim().length < 5) {
      setCityHelperText("Must have atleast 5 characters");
    } else setCityHelperText("");
    setCityInput(e.target.value);
  };

  const onPinCodeInputChange = (e) => {
    const val = e.target.value;

    val.match(/^\d{6}$/) !== null
      ? setPinHelperText("")
      : setPinHelperText("Invalid Pincode");

    setPinCodeInput(e.target.value);
  };

  const onLandMarkInputChange = (e) => {
    if (e.target.value.trim().length < 10) {
      setLandMarkHelper("Must have atleast 10 characters");
    } else {
      setLandMarkHelper("");
    }
    setLandMarkInput(e.target.value);
  };

  const onLandTypeInputChange = (value) => {
    setLandTypeHelper("");
    setLandTypeInput(value);
  };

  return (
    <>
      <Head>
        <title>Sell | RealEstate</title>
        <meta
          name="description"
          content="This is the Sell page where a user can upload their land details so that buyers can fetch these details"
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
            <Text>Upload Site Details</Text>
          </Center>

          <form onSubmit={onSellFormSubmit}>
            <Box bg="white" rounded="md" mt="20px" mb="5px">
              <FormControl as="fieldset" p="10px">
                <FormLabel
                  htmlFor="country"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  Country
                </FormLabel>
                <Countries
                  countryInput={countryInput}
                  setCountryInput={setCountryInput}
                />

                <FormLabel
                  htmlFor="state"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  State
                </FormLabel>
                <Input
                  id="state"
                  type="text"
                  value={stateInput}
                  onChange={onStateInputChange}
                  required
                />
                <FormHelperText color={"red"}>{stateHelperText}</FormHelperText>
                <FormLabel htmlFor="city" fontWeight={"bold"} fontSize={"20px"}>
                  City
                </FormLabel>
                <Input
                  id="city"
                  type="text"
                  value={cityInput}
                  onChange={onCityInputChange}
                  required
                />
                <FormHelperText color={"red"}>{cityHelperText}</FormHelperText>
                <FormLabel
                  htmlFor="pincode"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  PIN code
                </FormLabel>
                <Input
                  id="pincode"
                  type="number"
                  value={pinCodeInput}
                  onChange={onPinCodeInputChange}
                />
                <FormHelperText color={"red"}>{pinHelperText}</FormHelperText>

                <FormLabel
                  htmlFor="landmark"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  Landmark
                </FormLabel>
                <Input
                  id="landmark"
                  type="text"
                  value={landMarkInput}
                  onChange={onLandMarkInputChange}
                />
                <FormHelperText color={"red"}>{landMarkHelper}</FormHelperText>

                <RadioGroup
                  onChange={onLandTypeInputChange}
                  value={landTypeInput}
                >
                  <Stack direction="row">
                    <FormLabel
                      htmlFor="type"
                      fontWeight={"bold"}
                      fontSize={"20px"}
                    >
                      Type:
                    </FormLabel>
                    <Radio id="sell" value="sell">
                      Sell
                    </Radio>
                    <Radio id="sell" value="rent">
                      Rent
                    </Radio>
                  </Stack>
                  <FormHelperText color={"red"}>
                    {landTypeHelper}
                  </FormHelperText>
                </RadioGroup>
              </FormControl>
            </Box>
            <Center>
              <Button
                type="submit"
                bg="#a5cdd4"
                mb="10px"
                pl="50%"
                pr="50%"
                h="8vh"
                fontSize="20px"
              >
                Submit
              </Button>
            </Center>
          </form>
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
                <AlertTitle w="100%" mt={4} mb={1} fontSize={["lg"]}>
                  {notificationState.message}
                </AlertTitle>
              </VStack>
            </Alert>
          </Center>
        )}
      </Flex>
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

export default SellPage;
