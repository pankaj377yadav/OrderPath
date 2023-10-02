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
import PlacesCard from "@/components/placeCard";

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
  const [zoom, setZoom] = useState(13);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [searchedPlaceList, setSearchedPlaceList] = useState([]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0",
    libraries: ["places"], // ,
  });
  const [pickup, setPickup] = useState(true);
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

  const changePickUpAddress = async (e) => {
    setCurrentPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data && pickup) {
      setPickInputAddress(data.features[0].properties.formatted);
    } else if (data && !pickup) {
      setDropInputAddress(data.features[0].properties.formatted);
    }
  };
  return (
    <div className={styles.bodyproductForm}>
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
              zoom={zoom}
              center={
                currentPosition.lat
                  ? currentPosition
                  : {
                      lat: 27.7172,
                      lng: 85.324,
                    }
              }
            >
              <MarkerF
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 7,
                }}
                onDragEnd={changePickUpAddress}
                draggable={true}
                position={currentPosition}
              />
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
            {/* Pickup Section */}
            <div>
              <input
                className={styles.inputPickup}
                value={pickInputAddress}
                onBlur={() => !isSelectionOngoing && setPickUpOpen(false)}
                onChange={(e) => generatePlaces(e.target.value, true)}
                type="text"
                id="default-input"
                placeholder="Enter your pickup point"
                onClick={() => setPickup(true)}
              ></input>
              {pickUpOpen && (
                <PlacesCard
                  isSelectionOngoing={isSelectionOngoing}
                  setIsSelectionOngoing={setIsSelectionOngoing}
                  setOpen={setPickUpOpen}
                  setAddress={setPickInputAddress}
                  searchedPlaceList={searchedPlaceList}
                  setCurrentPosition={setCurrentPosition}
                  setZoom={setZoom}
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
                onClick={() => setPickup(false)}
              ></input>
              {dropOpen && (
                <PlacesCard
                  isSelectionOngoing={isSelectionOngoing}
                  setIsSelectionOngoing={setIsSelectionOngoing}
                  setOpen={setDropOpen}
                  setAddress={setDropInputAddress}
                  searchedPlaceList={searchedPlaceList}
                  setCurrentPosition={setCurrentPosition}
                  setZoom={setZoom}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
