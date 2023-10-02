import styles from "../../styles/form.module.css";

const PlacesCard = (props) => {
    console.log(props)
    return (
      <div
      
        onMouseLeave={() => props.setIsSelectionOngoing(false)}
        onMouseOver={() => props.setIsSelectionOngoing(true)}
        className={styles.autocompleteBox}
      >
        {props.searchedPlaceList.length > 0 &&
          props.searchedPlaceList.map((item) => {
            console.log(item.lat)
            return (
              <div
                onClick={() => { 
                  props.setCurrentPosition({
                    lat: item.lat,
                    lng: item.lon
                  })
                  props.setZoom(14);
                  props.setAddress(item.formatted);
                  props.setOpen(false);
                }}
                className={styles.autocompleteList}
              >
                {item.formatted.length > 20
                  ? item.formatted.substring(0, 20) + "..."
                  : item.formatted}
              </div>
            );
          })}
      </div>
    );
  };
  export default PlacesCard