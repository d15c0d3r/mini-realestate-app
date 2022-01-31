import { Box, Center, Flex, Stack, VStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <>
      <Flex bg="#262829" h={["150px"]} align="center" flexDir="column-reverse" position='relative'>
        <Center mt="20px" mb="20px">
          <Box textColor="grey">Copyrights 2022</Box>
        </Center>

        <Stack direction={"row"} spacing="24px">
          <NextLink href="/aboutus" passHref>
            <Link bg="#262829">
              <Center textColor="white" fontSize={["20px", "30px"]}>
                About Us
              </Center>
            </Link>
          </NextLink>
          <NextLink href="/contactus" passHref>
            <Link bg="#262829">
              <Center textColor="white" fontSize={["20px", "30px"]}>
                Contact Us
              </Center>
            </Link>
          </NextLink>
        </Stack>
      </Flex>
    </>
  );
};

export default Footer;
