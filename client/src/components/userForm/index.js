import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast,Modal, useDisclosure,Button } from "@chakra-ui/react";
import {changeUserDetails} from "../../redux/reducerSlices/userSlice"
import styles from "../../styles/form.module.css";
import { useSelector, useDispatch } from "react-redux";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
});

const UserForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {userDetails} = useSelector(state=>state.user)
  // const { fullName, email, phoneNumber } = userDetails
  const [role, setRole] = useState("User");
  const dispatch = useDispatch()
  const toast = useToast();

const fetchUserDetails = async () =>{
  const res = await fetch("http://localhost:3005/users/"+ userDetails._id) 
  const data = await res.json()
  if (data){
    dispatch(changeUserDetails(data.userDetails))
  }
}

  const  editUsersDetails= async (values) =>{
    const res = await fetch("http://localhost:3005/account/"+ userDetails._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.status == 200){
      fetchUserDetails()
      }
    }
     

  return (
    <div >
      <Formik
      initialValues={{fullName:userDetails.fullName, email:userDetails.email, phoneNumber:userDetails.phoneNumber}}
        validationSchema={SignupSchema}
        onSubmit={(values,{resetForm}) => {
          // same shape as initial values
          editUsersDetails(values)
          resetForm()
          // handleRegister(values);
          // console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <Field
              className={styles.input}
              name="fullName"
              placeholder="fullName"
            />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}{" "}
            <br />
            <Field
              className={styles.input}
              name="phoneNumber"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <br />
            <Field
              className={styles.input}
              name="email"
              placeholder="Email"
              type="email"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <br />
            <br />
            
            <button type="submit" className={styles.submit} onClick={onClose}>
              Submit
            </button>
          <Modal  onClose={onClose}>
          </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
