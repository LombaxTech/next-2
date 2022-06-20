import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import { doc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const BACKEND = "http://localhost:5000";

export default function ProfileSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const BACKEND = `http://localhost:5000`;

  const [authUser, authUserLoading, error] = useAuthState(auth);
  const [firestoreUser, setFirestoreUser] = useState(null);

  async function init() {
    if (!authUserLoading && authUser) {
      try {
        // let userDocRef = doc(db, "users", authUser.uid);
        // let userDoc = await getDoc(userDocRef);
        // console.log(userDoc.data());

        onSnapshot(doc(db, "users", authUser.uid), (userDoc) => {
          // console.log("Current data: ", doc.data());
          setFirestoreUser(userDoc.data());
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    init();
  }, [authUser, authUserLoading]);

  async function changeGoogleAccount() {
    try {
      // TODO: Get Auth Url
      let res = await axios.get(`${BACKEND}/gen-auth-link`);
      const url = res.data;
      console.log({ url });
      router.push(url);
      // window.open(url);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeGoogleAccount() {
    // console.log("removing");
    try {
      const uid = authUser.uid;
      const userRef = doc(db, "users", uid);

      let res = await updateDoc(userRef, {
        googleAuthorised: false,
        refresh_token: "",
        googleEmailAddress: "",
      });
      console.log("succesfully removed associated google account");
    } catch (error) {
      console.log(error);
      console.log("error in removing google account");
    }
  }

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function updateProfile() {
    console.log(password);
    if (password !== "") {
      try {
        return console.log(authUser);
        // console.log({ oldPassword, newPassword });
        const credential = EmailAuthProvider.credential(
          authUser.email,
          oldPassword
        );

        await reauthenticateWithCredential(authUser, credential);
        // console.log("done");
        // return;
        let res = await updatePassword(authUser, newPassword);
        console.log(res);
        console.log("updated password");
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  if (loading)
    return (
      <div className="flex justify-center mt-4">
        <Spinner />
      </div>
    );

  if (firestoreUser)
    return (
      <div>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <div>Google Section</div>
            <div className="font-bold">
              Google Link Complete? :{" "}
              {firestoreUser.googleAuthorised ? "Yes" : "No"}
            </div>
            <div className="">
              Current Google Email:{" "}
              {firestoreUser.googleEmailAddress
                ? firestoreUser.googleEmailAddress
                : "not available"}
            </div>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md"
              onClick={removeGoogleAccount}
            >
              Remove Associated Google Account
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={changeGoogleAccount}
            >
              Change Google Account
            </button>

            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile Edit
            </Heading>
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
                  <Button w="full">Change Icon</Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder={authUser.firstName}
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder={authUser.email}
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Old Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={updateProfile}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </div>
    );
}
