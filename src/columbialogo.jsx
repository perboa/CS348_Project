import React from "react";
import Columbia from './logos/Columbia University.png';
import "./index.css";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('./logos', false, /\.(png|jpe?g|svg)$/));
export default function ColumbiaLogo(props) {
    return (
        <img src={Columbia} className='mr-10 ml-10 w-52 h-52 z-50' alt =""/>
    )
}