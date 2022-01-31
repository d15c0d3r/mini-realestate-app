import { Center, Alert, VStack, AlertIcon, AlertTitle } from "@chakra-ui/react";
import Card from "../ui/card";

const BuySearchResult = (props) => {
  const { sites, showNotification, message, status } = props;

  return (
    <>
      <Center>
        <VStack w={["100%", "100%", "70%", "50%"]} spacing="25px" mb="50px">
          {sites.length > 0
            ? sites.map((site) => (
                <Card
                  key={site.ID}
                  name={site.NAME}
                  country={site.COUNTRY}
                  state={site.STATE}
                  city={site.CITY}
                  landmark={site.LANDMARK}
                  pincode={site.PINCODE}
                  contact={site.CONTACT}
                  email={site.EMAIL}
                  displayDelete={false}
                />
              ))
            : showNotification && (
                <Center>
                  <Alert
                    status={status}
                    mt="30px"
                    borderRadius={"10px"}
                    pl="150px"
                    pr="150px"
                  >
                    <VStack spacing={"10px"}>
                      <AlertIcon />
                      <AlertTitle w="100%" mt={4} mb={1} fontSize={["lg"]}>
                        {message}
                      </AlertTitle>
                    </VStack>
                  </Alert>
                </Center>
              )}
        </VStack>
      </Center>
    </>
  );
};

export default BuySearchResult;
