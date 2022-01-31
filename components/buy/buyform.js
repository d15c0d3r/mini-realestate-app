import { useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  Box,
  Text,
  Center,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Countries from "../ui/countries";

const BuyForm = (props) => {
  const { userDetails, setSites, notificationDispatch, TURNON } = props;
  const router = useRouter();
  const [countryInput, setCountryInput] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [landTypeInput, setLandTypeInput] = useState("");
  const [pinHelperText, setPinHelperText] = useState("");
  const [landTypeHelper, setLandTypeHelper] = useState("");

  const onBuyFormSubmit = async (e) => {
    e.preventDefault();
    if (pinHelperText !== "") {
      return;
    }
    if (landTypeInput === "") {
      setLandTypeHelper("Land Type is required");
      return;
    }
    const sessionToken = Cookies.get("token");
    if (sessionToken && userDetails) {
      const reqBody = {
        country: countryInput,
        pincode: pincodeInput,
        landtype: landTypeInput,
        email: userDetails.email,
        token: sessionToken,
      };

      const res = await fetch("api/submit-buyform", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        setSites([]);
        notificationDispatch({
          type: TURNON,
          payload: { message: data.message, status: "error" },
        });
      } else {
        setSites((prevState) => data.sites);
      }
    } else {
      router.push("/");
    }
  };

  const onPincodeInputChange = (e) => {
    const val = e.target.value;

    val.match(/^\d{6}$/) !== null
      ? setPinHelperText("")
      : setPinHelperText("Invalid Pincode");

    setPincodeInput(e.target.value);
  };

  const onlandTypeInputChange = (value) => {
    setLandTypeHelper("");
    setLandTypeInput(value);
  };

  return (
    <>
      <Box w={["100%", "100%", "100%", "40%"]} mt={"10px"}>
        <Box
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5))"
        >
          <Center w="100%" bg="#a5cdd4" p="6px" fontSize="30px" rounded="md">
            <Text>Search</Text>
          </Center>
          <form onSubmit={onBuyFormSubmit}>
            <Box bg="white" rounded="md" mt="20px" mb="20px">
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
                  htmlFor="pincode"
                  fontWeight={"bold"}
                  fontSize={"20px"}
                >
                  PIN code
                </FormLabel>
                <Input
                  id="pincode"
                  type="number"
                  value={pincodeInput}
                  onChange={onPincodeInputChange}
                  required
                />
                <FormHelperText color={"red"}>{pinHelperText}</FormHelperText>
                <RadioGroup
                  onChange={onlandTypeInputChange}
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
    </>
  );
};

export default BuyForm;
