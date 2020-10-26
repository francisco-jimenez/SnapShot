import React, { useState } from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import GeoInfoModal from './GeoInfoModal'

const Gallery = props => {
  const results = props.data;
  const [imageToShowGeoInfo, setImageToShowGeoInfo] = useState(null)
  const handleImageClick = (image) => {
    setImageToShowGeoInfo(image)
  }
  let images;
  let noImages;
  // map variables to each item in fetched image array and return image component
  if (results.length > 0) {
    images = results.map(image => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
      image.url = url
      {console.log(image)}
      debugger
      {console.log(image.location)}
      return (
        <>
            <Image url={url} location ={image.location}  key={id} id={id} alt={title} onClickImage={() => handleImageClick(image)} />
        </>
      );
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }
  return (
    <div>
      <ul>{images}</ul>
      {noImages}
      {imageToShowGeoInfo &&
        <GeoInfoModal open={imageToShowGeoInfo !== null} image ={imageToShowGeoInfo} onClose={() => setImageToShowGeoInfo(null)}/>
      }
    </div>
  );
};

export default Gallery;
