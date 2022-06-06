import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseApp } from "../firebase/firebaseClient";

const auth = getAuth(firebaseApp);

export default function login() {
  const router = useRouter();
  const toast = useToast();

  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  async function init() {
    console.log({ user, loading, error });
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // TODO: Add check for login error
    if (!loading && user && !loginLoading) router.push("/");
  }, [loading, error, user]);

  const login = async () => {
    try {
      setLoginLoading(true);
      //   console.log(email, password);
      let res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);

      toast({
        title: "Successfully Logged In",
        // description: "We've created your account for ",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setTimeout(() => {
        router.push("/protectedpage");
        // setLoginLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
      console.log(error);
      setLoginLoading(false);
      toast({
        title: "Incorrect Email or Password",
        // description: "We've created your account for ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !user) {
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign In</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={login}
                  isDisabled={loginLoading}
                >
                  Sign in
                </Button>
                {/* <Alert status="success" variant="solid">
                  <AlertIcon />
                  Data uploaded to the server. Fire on!
                </Alert> */}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
}
