import Image from "next/image";
import { Center, Box, Text } from "@chakra-ui/react";
import Head from "next/head";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us | RealEstate</title>
        <meta
          name="description"
          content="This is About Page of RealEstate website where users can know about the website and its owners."
        />
      </Head>
      <Center w="100%" h="100%" mt="100px" mb="40px">
        <Box
          shadow={"2xl"}
          p="6"
          rounded="md"
          bg="#262829"
          w={["100%", "70%", "50%"]}
        >
          <Center
            w="100%"
            bg="#262829"
            p="6px"
            fontSize={["15px", "20px", "25px", "30px"]}
            rounded="md"
            color={"white"}
          >
            <Text>This Page is currently under construction</Text>
          </Center>
        </Box>
      </Center>
      <Center>
        <div style={{ overflow: "hidden" }}>
          <Image
            src={"/images/under-construction.png"}
            width={2000}
            height={550}
            alt={"Construction Image"}
          />
        </div>
      </Center>
    </>
  );
};

export default AboutPage;
