import {
  Alert,
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import NextLink from "next/link";

import Badge from "../components/Badge";

import { firebaseApp, db } from "../firebase/firebaseClient";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

import useCustomAuth from "../customHooks/useCustomAuth";

import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Navbar() {
  const router = useRouter();

  const { user, loading } = useCustomAuth();

  const [notifications, setNotificiations] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        if (!loading && user) {
          // get all notificatios for user

          const q = query(
            collection(db, "notifications"),
            where("userId", "==", user.uid)
          );

          onSnapshot(q, (notificationsSnapshot) => {
            let notifications = [];
            let unreadNotifications = [];

            notificationsSnapshot.forEach((notification) => {
              // console.log(notification.data());
              notifications.push({
                id: notification.id,
                ...notification.data(),
              });

              if (notification.data().read)
                unreadNotifications.push({
                  id: notification.id,
                  ...notification.data(),
                });
            });

            setNotificiations(notifications);
            setUnreadNotifications(unreadNotifications);
            console.log("unread notifications");
            console.log(unreadNotifications);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, [user, loading]);

  const logout = async () => {
    try {
      signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const readNotification = async (notification) => {
    try {
      console.log(notification);
      const docRef = doc(db, "notifications", notification.id);
      await updateDoc(docRef, {
        read: true,
      });
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onToggle } = useDisclosure();

  const [notificationValue, setNotificationValue] = useState("all");

  return (
    <Box>
      <div className="fixed bottom-0 right-0 m-10 mr-[-8]">
        <div className="flex flex-col gap-4">
          <Alert>hello</Alert>
        </div>
      </div>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            // as={"a"}
            // href={"/"}
          >
            <NextLink href="/">Logo</NextLink>
          </Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {!user && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
            >
              Sign In
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              as={"a"}
              href={"/signup"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}

        {/* {authUser && (
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            onClick={logout}
          >
            Logout
          </Button>
        )} */}
        {user && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            align={"center"}
          >
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Badge count={notifications.length} />
              </MenuButton>
              <MenuList boxShadow="xl" className="bg-red-200">
                <div className="max-h-96 overflow-y-auto w-80 scrollbar-thin scrollbar-thumb-slate-200">
                  <div className="flex justify-center p-4">
                    <RadioGroup
                      defaultValue="all"
                      onChange={setNotificationValue}
                      value={notificationValue}
                    >
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="red" value="all">
                          All
                        </Radio>
                        <Radio colorScheme="green" value="unread">
                          Unread
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </div>
                  {notificationValue === "unread" &&
                    unreadNotifications.map((notification) => (
                      <>
                        <MenuDivider />
                        <MenuItem>
                          <div
                            className="flex justify-between items-center w-full mx-4 cursor-pointer"
                            onClick={() => readNotification(notification)}
                          >
                            <div className="">{notification.message}</div>
                            {!notification.read && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </MenuItem>
                        <MenuDivider />
                      </>
                    ))}
                  {notificationValue === "all" &&
                    notifications.map((notification) => (
                      <>
                        <MenuDivider />
                        <MenuItem>
                          <div
                            className="flex justify-between items-center w-full mx-4 cursor-pointer"
                            onClick={() => readNotification(notification)}
                          >
                            <div className="">{notification.message}</div>
                            {!notification.read && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </MenuItem>
                        <MenuDivider />
                      </>
                    ))}
                </div>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  className="cursor-pointer"
                  src={user.profilePictureUrl}
                  size={"sm"}
                />
              </MenuButton>
              <MenuList boxShadow="xl">
                <NextLink href="/profile-settings">
                  <MenuItem>Profile Settings</MenuItem>
                </NextLink>
                <MenuDivider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              {/* A lot bloody faster */}
              <NextLink href={navItem.href ?? "#"}>{navItem.label}</NextLink>
              {/* <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link> */}
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  //   {
  //     label: "Inspiration",
  //     children: [
  //       {
  //         label: "Explore Design Work",
  //         subLabel: "Trending Design to inspire you",
  //         href: "#",
  //       },
  //       {
  //         label: "New & Noteworthy",
  //         subLabel: "Up-and-coming Designers",
  //         href: "#",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Find Work",
  //     children: [
  //       {
  //         label: "Job Board",
  //         subLabel: "Find your dream design job",
  //         href: "#",
  //       },
  //       {
  //         label: "Freelance Projects",
  //         subLabel: "An exclusive list for contract work",
  //         href: "#",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Learn Design",
  //     href: "#",
  //   },
  {
    label: "Protected",
    href: "/protectedpage",
  },
  {
    label: "Create Booking",
    href: "/datetimepicker",
  },
  {
    label: "All Users",
    href: "/users",
  },
  {
    label: "Test Chat",
    href: "/testchat",
  },
  {
    label: "Future Payments",
    href: "/futurepayments",
  },
  {
    label: "Cards",
    href: "/paymentmethods",
  },
  {
    label: "Booking Requests",
    href: "/bookingrequests",
  },
  {
    label: "Tutor Dashboard",
    href: "/tutordashboard",
  },
];
