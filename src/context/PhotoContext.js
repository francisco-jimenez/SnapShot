import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [cachedImages, setCachedImages] = useState(new Map())
  const updateCachedImagesMap = (query,images) => {
    setCachedImages(new Map(cachedImages.set(query.toLowerCase(),images)));
  }
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImagesFromAPI = (query) => {
    axios
    .get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    )
    .then(response => {
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
    let alreadyCachedImages =  cachedImages.get(query.toLowerCase())
    if(alreadyCachedImages) {
      setImages(alreadyCachedImages);
      setLoading(false);
    }else {
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
