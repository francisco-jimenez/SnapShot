import React from "react";
import {Popup } from 'semantic-ui-react'
import {Header} from 'semantic-ui-react'

const Image = ({ url, location, title, onClickImage }) => (
  <>
    <Popup 
      content={<Header as ='h4'>{location?.locality?._content} - {location?.region?._content +' (' + location?.country?._content + ')'}</Header>}
      position='top center'
      trigger={<li ><img clasName ='loadedImage' src={url} alt={title} onClick ={() => onClickImage()} /></li>} 
    />
  </>
  
);

export default Image;
