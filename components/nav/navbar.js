import NextLink from "next/link";
import { Stack, Button, Spacer, Link, Center, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const NavBar = (props) => {
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const { onOpen } = props;

  return (
    <>
      <Stack direction={["column", "row"]} spacing="24px">
        <NextLink href="/">
          <Box
            bg="#a5cdd4"
            p="8px"
            borderRadius="4px"
            pl="10px"
            pr="10px"
            fontSize="18px"
            fontStyle="bold"
            _hover={{ cursor: "pointer" }}
            align="center"
          >
            Home
          </Box>
        </NextLink>
        {loggedIn && (
          <NextLink href="/buy">
            <Box
              bg="#a5cdd4"
              p="8px"
              borderRadius="4px"
              pl="18px"
              pr="18px"
              fontSize="18px"
              fontStyle="bold"
              _hover={{ cursor: "pointer" }}
              align="center"
            >
              Buy
            </Box>
          </NextLink>
        )}
        {loggedIn && (
          <NextLink href="/sell">
            <Box
              bg="#a5cdd4"
              p="8px"
              borderRadius="4px"
              pl="18px"
              pr="18px"
              fontSize="18px"
              fontStyle="bold"
              _hover={{ cursor: "pointer" }}
              align="center"
            >
              Sell
            </Box>
          </NextLink>
        )}
        {!loggedIn && (
          <NextLink href="/signup">
            <Box
              bg="#a5cdd4"
              p="8px"
              borderRadius="4px"
              pl="10px"
              pr="10px"
              fontSize="18px"
              fontStyle="bold"
              _hover={{ cursor: "pointer" }}
              align="center"
            >
              Signup
            </Box>
          </NextLink>
        )}
        <Spacer />
        {loggedIn && (
          <Button bg="#a5cdd4" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
        )}
      </Stack>
    </>
  );
};

export default NavBar;
