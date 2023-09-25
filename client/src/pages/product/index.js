import React from "react";
import { useState } from "react";
import styles from "../../styles/form.module.css";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect } from "react";
import ProductForm from "../../components/productForm";

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
                ? item.formatted.substring(0, 35) + "..."
                : item.formatted}
            </div>
          );
        })}
    </div>
  );
};

const Product = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 27.7172,
    lng: 85.324,
  });

  // Goolgal map
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false);
  const [pickInputAddress, setPickInputAddress] = useState("");
  const [dropInputAddress, setDropInputAddress] = useState("");
  const [pickUpOpen, setPickUpOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [searchedPlaceList, setSearchedPlaceList] = useState([]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0",
    libraries: ["places"], // ,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((latlan) => {
      const { latitude, longitude } = latlan.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });
  }, []);

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
    <div style={{ display: "flex" }}>
      {/* Profuct Form */}
      <ProductForm />

      {/* google map  */}
      <div className={styles.pickup}>
        {isLoaded && (
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "70%",
              width: "100%",
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
            justifyContent: "space-evenly",
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
          <div>
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
