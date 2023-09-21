import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "./login";
// import { HamburgerIcon, AddIcon,IconButton, ExternalLinkIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducerSlices/userSlice";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import styles from "../styles/form.module.css";

const inter = Inter({ subsets: ["latin"] });
import {
  Menu,
  MenuButton,
  MenuList,
  Input,
  Wrap,
  Button,
  WrapItem,
  Stack,
  ChakraProvider,
  Heading,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
const CustomMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Stack
    direction="row"
    justifyContent={"Center"}
    alignItems={"Center"}
    margin={"100px"}
    // padding={"50px"}
  >
    <Menu width={"0px"} height={"50px"}>
       <MenuButton as={Button} colorScheme='pink' className={styles.p}>
    Profile
  </MenuButton>
      <MenuList>
        <div className="flex flex-col justify-center ">
          <button onClick={()=>router.push('/account')} className={styles.p}>My Account</button>
          <br></br>
          <button onClick={() => dispatch(logout())} className={styles.p}>Logout</button>
        </div>
      </MenuList>
    </Menu>
    </Stack>
  );
};
export default function Home() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Stack
        direction="row"
        justifyContent={"Center"}
        alignItems={"Center"}
        // margin={"100px"}
        // padding={"50px"}
      >
        <Heading padding={"20px"} color="orange" >
          <p className={styles.p}>Welcome To Order Path</p>
        </Heading>
      </Stack>

      <br />
      <br />
      <Stack
        direction="row"
        justifyContent={"Center"}
        alignItems={"Center"}
        // margin={"100px"}
        // padding={"50px"}
      >
        <Input className={styles.p}
          color="tomato"
          placeholder="Enter your tacking numbers"
          fontSize={20}
          width={500}
          _placeholder={{ color: "inherit" }}
        />
      </Stack>

      <div >
        {isLoggedIn ? (
          <CustomMenu />
        ) : (
          <ChakraProvider>
            <Stack
              direction="row"
              justifyContent={"Center"}
              alignItems={"Center"}
              // margin={"100px"}
              padding={"50px"}
            >
              <Wrap spacing={20} margin={"10px"}>
                <ChakraLink href="/login" isInternal>
                  <WrapItem>
                    <Button className={styles.p}
                      colorScheme="green"
                      padding={"30px"}
                      margin={"20px"}
                      fontSize={24}
                    >
                      Login
                    </Button>
                  </WrapItem>
                </ChakraLink>

                <ChakraLink href="/register" isInternal>
                  <WrapItem>
                    <Button className={styles.p}
                      colorScheme="yellow"
                      padding={"30px"}
                      margin={"20px"}
                      fontSize={24}
                    >
                      Register
                    </Button>
                  </WrapItem>
                </ChakraLink>
              </Wrap>
            </Stack>
          </ChakraProvider>
        )}

        <Stack
          direction="row"
          justifyContent={"Center"}
          alignItems={"Center"}
          // margin={"100px"}
          padding={"50px"}
        >
          <Image
            direction="row"
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/orderpath_logo.jpg"
            alt="orderpath_logo.jpg"
            width={180}
            backgroundcolor="black"
            height={180}
            padding={"300px"}
            margin={"300px"}
            priority
          />
        </Stack>

        <br />
        <br />


      </div>
    </main>
  );
}



