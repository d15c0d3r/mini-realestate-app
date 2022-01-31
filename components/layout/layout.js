import Navigation from "../nav/nav";
import Footer from "./footer";
import { Flex } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <>
      <Flex direction="column" minH="100vh" h="100%" bg="#a2b5ba">
        <Navigation />
        {props.children}
      </Flex>
      <Footer />
    </>
  );
};

export default Layout;
