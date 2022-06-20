import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Upload from "rc-upload";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Center,
  Avatar,
  AvatarBadge,
  IconButton,
} from "@chakra-ui/react";
import {
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
  AddIcon,
} from "@chakra-ui/icons";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp, db, storage } from "../firebase/firebaseClient";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const auth = getAuth(firebaseApp);

export default function Signup() {
  const router = useRouter();
  const toast = useToast();

  const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [signupLoading, setSignupLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [file, setFile] = useState(null);

  const signup = async () => {
    try {
      setSignupLoading(true);
      console.log({ email, password, firstName, lastName });

      // TODO: Create auth user

      let userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      let createdUser = userCredentials.user;

      // TODO: Upload profile pic
      let imageUrl;

      if (file) {
        const imageRef = ref(storage, file.name);
        await uploadBytes(imageRef, file);

        console.log("Uploaded a blob or file!");

        // get url
        imageUrl = await getDownloadURL(ref(storage, file.name));
      }

      await setDoc(doc(db, "users", createdUser.uid), {
        email,
        firstName,
        profilePictureUrl: imageUrl,
        googleAuthorised: false,
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(createdUser);
      console.log("sent email verification");

      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      console.log(createdUser);
      setTimeout(() => {
        setSignupLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setSignupLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (!loading && user && !signupLoading) router.push("/");
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
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="userName">
                <FormLabel>User Icon</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                      <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                      />
                    </Avatar>
                  </Center>
                  <Center w="full">
                    <Button w="full">Add Icon</Button>
                  </Center>
                </Stack>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={signup}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
}
