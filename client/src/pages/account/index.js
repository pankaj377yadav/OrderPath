import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await fetch(
      "http://localhost:3005/users-image/" + userDetails._id,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
  };
  return (
    <div>
      <Stack className={styles.stack}>
        <Heading className={styles.heading}>Account Details</Heading>
        <div className={styles.body}>
          <p className={styles.p}>{userDetails.fullName}</p>
          <p className={styles.p}>{userDetails.phoneNumber}</p>
          <p className={styles.p}>{userDetails.email}</p>
          <p className={styles.p}>{userDetails.role}</p>
          <input
            onChange={(e) => uploadImage(e.target.files[0])}
            type="file"
            className={styles.p}
          />

          <Button onClick={onOpen} className={styles.p}>
            Edit
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ color: "orange" }} className={styles.p}>
                Edit Details
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UserForm />
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={onClose}
                  className={styles.p}
                >
                  Done
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
        <div>
          <Image
            direction="row"
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src={
              "http://localhost:3005/users-image/" +
              userDetails._id +
              "?Key=" +
              Math.random()
            }
            alt="user Img"
            width={180}
            height={180}
            padding={"300px"}
            margin={"300px"}
            priority
          />
        </div>
      </Stack>
    </div>
  );
}

export default index;
