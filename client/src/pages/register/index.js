import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import styles from "../../styles/form.module.css";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too weak!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(2, "Too weak!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
});

const Register = () => {
  const [role, setRole] = useState("User");
  const toast = useToast();
  const handleRegister = async (values) => {
    // debugger;
    const res = await fetch("http://localhost:3005/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json()
    // console.log(data)
    toast({
      title: data.msg,
      status: res.status==409 ? "warning" : "success",
      isClosable: true,
    });
  };
  return (
    <div className={styles.body}>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          email: " ",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleRegister(values);
          // console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>Sign Up</h1>
            <Field
              className={styles.input}
              name="fullName"
              placeholder="Full Name"
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
            <Field
              className={styles.input}
              name="confirmPassword"
              type="confirmPassword"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}{" "}
            <br />
            <Field as="select" name="role" className={styles.input}>
              <option value="User" onClick={() => setRole("User")}>
                User
              </option>
              <option value="Rider" onClick={() => setRole("Rider")}>
                Rider
              </option>
              <option value="Admin" onClick={() => setRole("Admin")}>
                Admin
              </option>
            </Field>
            <br />
            <button type="submit" className={styles.submit}>
              Submit
            </button>
            <p className={styles.p}>
            Already User!
            </p>
            <br />{" "}
            <Link href="/login" className={styles.submit}>
              Sign in
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
