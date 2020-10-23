import React from "react";

const Image = ({ url, title, onClickImage }) => (
  <li>
    <img src={url} alt={title} onClick ={() => onClickImage()}/>
  </li>
);

export default Image;
