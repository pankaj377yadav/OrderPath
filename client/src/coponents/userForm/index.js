import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import styles from "../../styles/form.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

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
  const {userDetails} = useSelector(state=>state.user)
  const [role, setRole] = useState("User");
  const toast = useToast();
  // const handleRegister = async (values) => {
  //   // debugger;
  //   const res = await fetch("http://localhost:3005/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(values),
  //   });
  //   const data = await res.json()
  //   // console.log(data)
  //   toast({
  //     title: data.msg,
  //     status: res.status==409 ? "warning" : "success",
  //     isClosable: true,
  //   });
  // };
  return (
    <div >
      <Formik
        initialValues={userDetails}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
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
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
