import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../../styles/form.module.css";
import Image from "next/image";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect } from "react";
// import styles from "../../styles/map.module.css"

const SignupSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  productPrice: Yup.string().required("Required"),
  productCategory: Yup.string(),
  productDescription: Yup.string().min(2, "Too weak!").max(50, "Too Long!"),
});

const PlacesCard = (props) => {
  return (
    <div
      onMouseLeave={() => props.setIsSelectionOngoing(false)}
      onMouseOver={() => props.setIsSelectionOngoing(true)}
      className={styles.autocompleteBox}
    >
      {props.searchedPlaceList.length > 0 &&
        props.searchedPlaceList.map((item) => {
          return (
            <div
              onClick={() => {
                props.setAddress(item.formatted);
                props.setOpen(false);
              }}
              className={styles.autocompleteList}
            >
              {item.formatted.length > 15
                ? item.formatted.substring(0, 15) + "..."
                : item.formatted}
            </div>
          );
        })}
    </div>
  );
};

const Product = () => {
  const [file, setFile] = useState(null);
  const [productList, setProductList] = useState([]);
  const toast = useToast();
  const [currentPosition, setCurrentPosition] = useState({
    lat: 27.7172,
    lng: 85.324,
  });
  // const fetchProductList = async()=> {
  //   try{
  //     const res = await fetch("http://localhost:3005/product")
  //     const data = await res.json()
  //      if(data.productList){
  //         setProductList(data.productList)
  //       }
  //   }catch(err){
  //     console.log(err)
  //   }

  // }
  // useEffect(() => {
  //   fetchProductList()
  // }, [])

  const handleRegister = async (values) => {
    // debugger;
    const formData = new FormData();
    for (let item in values) {
      formData.append(item, values[item]);
    }
    formData.append("productImage", file);
    const res = await fetch("http://localhost:3005/product", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    // console.log(data)
    toast({
      title: data.msg,
      status: res.status == 409 ? "warning" : "success",
      isClosable: true,
    });
  };
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false);
  const [pickInputAddress, setPickInputAddress] = useState("");
  const [dropInputAddress, setDropInputAddress] = useState("");

  const [pickUpOpen, setPickUpOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const [searchedPlaceList, setSearchedPlaceList] = useState([]);
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0",
    libraries: ["places"], // ,
    // ...otherOptions
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((latlan) => {
      const { latitude, longitude } = latlan.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });
  }, []);
  // const handleImageChange =async (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const pImg = e.target.value[0];
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (reader.readyState === 2) {
  //         const imageUrl = event.target.result;
  //         setFile(imageUrl);
  //       }
  //     };
  //     await reader.readAsDataURL(pImg);
  //   }
  // };
  const generatePlaces = async (text, pick) => {
    if (pick) {
      console.log(pick, "iam pickup");
      setPickUpOpen(true);
      setPickInputAddress(text);
    } else {
      setDropOpen(true);
      setDropInputAddress(text);
    }
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data.results) {
      setSearchedPlaceList(data.results);
    }
  };

  return (
    <div style={{display:'flex'}}>
      <div className={styles.productForm}>
      <Formik
        initialValues={{
          productName: "",
          productPrice: "",
          productCategory: "",
          productDescription: "",
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
          <div className={styles.pickup}>
            <Form className={styles.form}>
              <h1 className={styles.title}> Product Details </h1>
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
              <br />
              <input
                onChange={(e) => setFile(e.target.files[0])}
                // onChange={handleImageChange}
                type="file"
                className={styles.p}
              />
              <br />
              <button type="submit" className={styles.submit}>
                Submit
              </button>
            </Form>
            {/* product img */}

            {/* <div>
              {productList.map((item) => {
                return (
                  <div
                    style={{ width: "200px", height: "190px", margin: "10px" }}
                  >
                    <Image
                      src={
                        "http://localhost:3005/product-image/" +
                        item._id +
                        "?key=" +
                        item.productName
                      }
                      height={600}
                      width={400}
                      alt="product_img"
                    />
                    {item.productName}
                    {item.productPrice}
                  </div>
                );
              })}
            </div> */}
          </div>
        )}
      </Formik>
      </div>

      {/* google map  */}
      <div className={styles.pickup}>
        {isLoaded && (
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: '60%',
              width: '100%',
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
        {/* Enter pickup & Destination place */}
        <div
          style={{
            // width:'100%',
            display: "flex",
            justifyContent:'space-evenly',
          }}
        >
          <div>
            <input
              className={styles.inputPickup}
              value={pickInputAddress}
              onBlur={() => !isSelectionOngoing && setPickUpOpen(false)}
              onChange={(e) => generatePlaces(e.target.value, true)}
              type="text"
              id="default-input"
              placeholder="Enter your pickup point"
            ></input>
            {pickUpOpen && (
              <PlacesCard
                isSelectionOngoing={isSelectionOngoing}
                setIsSelectionOngoing={setIsSelectionOngoing}
                setOpen={setPickUpOpen}
                setAddress={setPickInputAddress}
                searchedPlaceList={searchedPlaceList}
              />
            )}
          </div>
          <div >
            <input
              className={styles.inputPickup}
              value={dropInputAddress}
              onBlur={() => !isSelectionOngoing && setDropOpen(false)}
              onChange={(e) => generatePlaces(e.target.value, false)}
              type="text"
              id="default-input"
              placeholder="Enter your Destination"
            ></input>
            {dropOpen && (
              <PlacesCard
                isSelectionOngoing={isSelectionOngoing}
                setIsSelectionOngoing={setIsSelectionOngoing}
                setOpen={setDropOpen}
                setAddress={setDropInputAddress}
                searchedPlaceList={searchedPlaceList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
