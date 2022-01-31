import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

function Card(props) {
  const {
    id,
    name,
    country,
    city,
    state,
    landmark,
    pincode,
    contact,
    email,
    displayDelete,
    setUploadsHandler,
  } = props

  const onDeleteHandler = (e) => {
    e.preventDefault();
    fetch(`${process.env.domain}api/${Cookies.get("token")}`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setUploadsHandler(id);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Box
        boxShadow="xs"
        bg="white"
        rounded="lg"
        minH={["250px", "300px", "330px", "300px"]}
        maxH={"100px"}
        w="100%"
        _hover={{ boxShadow: "dark-lg" }}
        overflow="hidden"
      >
        <VStack spacing="0px">
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
              pt="5px"
            >
              Country :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {country}
            </Text>
          </HStack>
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
              pt="5px"
            >
              State :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {state}
            </Text>
          </HStack>
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
              pt="5px"
            >
              CITY :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {city}
            </Text>
          </HStack>
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
            >
              LandMark :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {landmark}
            </Text>
          </HStack>
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
            >
              PINCODE :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {pincode}
            </Text>
          </HStack>
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
            >
              Site Uploader :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {name}
            </Text>
          </HStack>
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
            >
              Phone Contact :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {contact}
            </Text>
          </HStack>
          <HStack>
            <Text
              textTransform="uppercase"
              fontStyle="italic"
              fontSize={["15px", "20px", "20px", "20px"]}
              letterSpacing="wide"
              color="#3e403f"
              pl="10px"
            >
              Email Id :
            </Text>
            <Text
              fontSize={["14px", "18px", "20px", "20px"]}
              fontWeight="bold"
              color="#3e403f"
            >
              {email}
            </Text>
          </HStack>
        </VStack>
      </Box>
      {displayDelete && (
        <DeleteIcon
          _hover={{ cursor: "pointer", shadow: "2xl" }}
          bg="#262829"
          w="100%"
          h="8vh"
          borderRadius={"10px"}
          color={"white"}
          onClick={onDeleteHandler}
        />
      )}
    </>
  );
}

export default Card;
