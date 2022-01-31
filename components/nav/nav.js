import { Box, useDisclosure } from "@chakra-ui/react";
import NavBar from "./navbar";
import NavDrawer from "./navdrawer";

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="#262829" w="100%" p={5} color="black">
      <NavBar onOpen={onOpen} />
      <NavDrawer onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

export default Navigation;
