import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../../styles/form.module.css";
import Image from "next/image";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useEffect } from "react";
import { Input } from "@chakra-ui/react";

const SignupSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  productPrice: Yup.string().required("Required"),
  productCategory: Yup.string().required("Required"),
  productDescription: Yup.string()
    .min(2, "Too weak!")
    .max(50, "Too Long!")
    .required("Required"),
  // productImage: Yup.string()
  //   .required("Required"),
});

const Register = () => {
  const [role, setRole] = useState("User");
  const { userDetails } = useSelector((state) => state.user);
  const toast = useToast();
  const [currentPosition, setCurrentPosition] = useState({
    lat: 27.7172,
    lng: 85.324,
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("productImg", file);
    const res = await fetch(
      "http://localhost:3005/product-image/" + userDetails._id,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
  };
  const handleRegister = async (values) => {
    // debugger;
    const res = await fetch("http://localhost:3005/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    // console.log(data)
    toast({
      title: data.msg,
      status: res.status == 409 ? "warning" : "success",
      isClosable: true,
    });
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0", // ,
    // ...otherOptions
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((latlan) => {
      const { latitude, longitude } = latlan.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <div className={styles.body}>
      <Formik
        initialValues={{
          productName: "",
          productPrice: "",
          productCategory: "",
          productDescription: "",
          productImage: " ",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
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
            <input
              onChange={(e) => uploadImage(e.target.files[0])}
              type="file"
              className={styles.p}
            />
            <br />
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <Image
          direction="row"
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={
            "http://localhost:3005/product-image/" +
            userDetails._id +
            "?Key=" +
            Math.random()
          }
          alt="product img"
          width={180}
          height={180}
          padding={"300px"}
          margin={"300px"}
          priority
        />
      </div>
      <div className={styles.pickup}>
        {isLoaded && (
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "400px",
              width: "800px",
            }}
            zoom={12}
            center={{
              lat: 27.7172,
              lng: 85.324,
            }}
          >
            <MarkerF draggable={true} position={currentPosition} />
          </GoogleMap>
        )}
        <br />

        <Input
          className={styles.p}
          direction="column"
          color="tomato"
          placeholder="Enter Pickup Point"
          fontSize={20}
          width={400}
          _placeholder={{ opacity: 0.4, color: "inherit" }}
        />
        <br />
        <br />
        <Input
          className={styles.p}
          direction="column"
          justifyContent={"Center"}
          alignItems={"Center"}
          color="tomato"
          placeholder="Enter Destination"
          fontSize={20}
          width={400}
          _placeholder={{ opacity: 0.4, color: "inherit" }}
        />
      </div>
    </div>
  );
};

export default Register;
