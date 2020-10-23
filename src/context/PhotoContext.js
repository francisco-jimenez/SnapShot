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
    return axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${imageId}&format=json&nojsoncallback=1`
      )
      .then(response => {
        return response.data?.photo?.location
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching photo geo location",
          error
        );
      });
  }


  const getImagesFromAPI = (query) => {
    const setGeoInfoToImages =(imagesWithoutGeoInfo) => {
      let imagesWithGeoInfo = []

      for (const imageToAddGeoInfo of imagesWithoutGeoInfo) {
        getImageGeoLocation(imageToAddGeoInfo.id)
        .then((response) => imageToAddGeoInfo.location = response)
        debugger
        imagesWithGeoInfo.push(imageToAddGeoInfo)
      }

      return imagesWithGeoInfo
    }

    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&has_geo=1&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        let loadedImages = response.data.photos.photo
        loadedImages = setGeoInfoToImages(loadedImages)
        setImages(loadedImages);
        console.log(loadedImages)
        updateCachedImagesMap(query.toLowerCase(), loadedImages)
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
