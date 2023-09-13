import React from "react";
import { useSelector } from "react-redux";
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
import UserForm from "../../components/userForm";
import styles from "../../styles/account.module.css";

function index() {
  const { userDetails } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Stack className={styles.stack}>
        <Heading className={styles.heading}>
          Account Details
        </Heading>
        <div className={styles.body}>
          <p className={styles.p}>{userDetails.fullName}</p>
          <p className={styles.p}>{userDetails.phoneNumber}</p>
          <p className={styles.p}>{userDetails.email}</p>
          <p className={styles.p}>{userDetails.role}</p>
          <input  onChange={e=>console.log(e.target.files[0])} type="file"/>

          <Button onClick={onOpen}>Edit</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ color: "red" }}>
                Edit Details
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>

              <UserForm />
              
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </Stack>
    </div>
  );
}

export default index;
