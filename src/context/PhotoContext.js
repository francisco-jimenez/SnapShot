import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";


export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [cachedImages, setCachedImages] = useState(new Map())
  const updateCachedImagesMap = (query, images) => {
    setCachedImages(new Map(cachedImages.set(query.toLowerCase(), images)));
  }
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageGeoLocation = (imageId) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${imageId}&format=json`
      )
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching photo geo location",
          error
        );
      });
  }


  const getImagesFromAPI = (query) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&has_geo=1&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        getImageGeoLocation(response.data.photos.photo[0].id)
        setImages(response.data.photos.photo);
        updateCachedImagesMap(query.toLowerCase(), response.data.photos.photo)
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  }


  const runSearch = query => {
    debugger
    let alreadyCachedImages = cachedImages.get(query.toLowerCase())
    if (alreadyCachedImages) {
      setImages(alreadyCachedImages);
      setLoading(false);
    } else {
      getImagesFromAPI(query)
    }
  };
  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
