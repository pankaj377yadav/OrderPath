import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import {setLoginDetails} from "../../redux/reducerSlices/userSlice"
import { useDispatch } from "react-redux";
import styles from "../../styles/form.module.css";

const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const handleRegister = async (values) => {
    // debugger;
    const res = await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json()
    if (data.isLoggedIn){
      dispatch(setLoginDetails(data))
    }

    // console.log(data)
    toast({
      title: data.msg,
      status: res.status==404 ? "warning" : "success",
      isClosable: true,
    });
  };

  return (
    <div className={styles.body}>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleRegister(values);
          // console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>Log In</h1>
            <Field
              className={styles.input}
              name="phoneNumber"
              placeholder="Phone Number Or Email "
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <br />
            <Field
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}{" "}
            <br />
            <button type="submit" className={styles.submit}>
              Submit
            </button>
            <p className={styles.p}>Doesn't Have Account Yet!</p>
            <br />{" "}
            <Link href="/register" className={styles.submit}>
              Sign Up
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
