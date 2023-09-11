import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import styles from "../../styles/form.module.css";

const SignupSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  productPrice: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  productCategory: Yup.string()
    .min(2, "Too weak!")
    .max(50, "Too Long!")
    .required("Required"),
  productDescription: Yup.string()
    .min(2, "Too weak!")
    .max(50, "Too Long!")
    .required("Required"),
  // productImage: Yup.string()
  //   .required("Required"),
});

const Register = () => {
  const [role, setRole] = useState("User");
  const toast = useToast();
  const handleRegister = async (values) => {
    // debugger;
    const res = await fetch("http://localhost:3005/product", {
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
          productName: "",
          productPrice: "",
          productCategory: "",
          productDescription: "",
          // productImage: " ",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values,{resetForm}) => {
          // same shape as initial values
          handleRegister(values);
          resetForm(); 
          // console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}> Fill Product Details </h1>
            <Field
              className={styles.input}
              name="productName"
              placeholder="Produnct Name"
            />
            {errors.productName && touched.productName ? (
              <div>{errors.productName}</div>
            ) : null}{" "}
            <br />
            <Field
              className={styles.input}
              name="productPrice"
              placeholder="Product Price"
            />
            {errors.productPrice && touched.productPrice ? (
              <div>{errors.productPrice}</div>
            ) : null}
            <br />
            {/* <Field
              className={styles.input}
              name="productImage"
              placeholder="Product Image"
            />
            {errors.productImage && touched.productImage ? <div>{errors.productImage}</div> : null}
            <br /> */}
            <Field
              className={styles.input}
              name="productCategory"
              placeholder="Product Category"
            />
            {errors.productCategory && touched.productCategory ? (
              <div>{errors.productCategory}</div>
            ) : null}{" "}
            <br />
            <Field
              className={styles.input}
              name="productDescription"
              placeholder=" Product Description"
            />
            {errors.productDescription && touched.productDescription ? (
              <div>{errors.productDescription}</div>
            ) : null}{" "}
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

export default Register;
