import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Box,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { sessionActions } from "../../store/index";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const NavDrawer = (props) => {
  const { onClose, isOpen } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  

  const onLogoutHandler = (e) => {
    e.preventDefault();
    onClose();
    dispatch(sessionActions.logout());
    router.push("/");
  };

  return (
    <>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" bg="#262829" textColor="white">
            User Details
          </DrawerHeader>
          <DrawerBody p={0}>
            <Box w="100%">
              <VStack spacing="0px">
                <Button w="100%" bg="#a5cdd4">
                  <Link href={`/${Cookies.get("token")}`}>Profile</Link>
                </Button>
                <Divider />
                <Button w="100%" bg="#a5cdd4">
                  <Link href={`/${Cookies.get("token")}/user-uploads`}>My Uploads</Link>
                </Button>
                <Button w="100%" bg="#a5cdd4" onClick={onLogoutHandler}>
                  Log out
                </Button>
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
