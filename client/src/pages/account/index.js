import { background } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  Stack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import UserForm from "../../coponents/userForm";
import styles from "../../styles/account.module.css";

function index() {
  const { userDetails } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Stack className={styles.stack}>
        <Heading className={styles.heading}>
          Account
        </Heading>
        <div className={styles.body}>
          <p className={styles.p}>{userDetails.fullName}</p>
          <p className={styles.p}>{userDetails.phoneNumber}</p>
          <p className={styles.p}>{userDetails.email}</p>
          <p className={styles.p}>{userDetails.role}</p>

          <Button onClick={onOpen}>Edit</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ color: "orange" }}>
                Edit Details
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody></ModalBody>
              <UserForm />
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Cancle
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </Stack>
    </div>
  );
}

export default index;
