import React, { useEffect } from "react";
import "./Banner.css"; // Ensure the path is correct

function Banner() {
  useEffect(() => {
    const bannerContent = document.querySelector(".banner-content");
    bannerContent.classList.add("slide-in"); // Add the slide-in effect when the component mounts
  }, []);

  return (
    <div className="banner-wrapper">
      <div className="banner-container">
        <div className="banner-content">
          <h1 className="banner-title">
            Fresh Fruit Boxes Delivered to Your Doorstep
          </h1>
          <p className="banner-subtitle">
            Get the freshest and most delicious fruits from local vendors
            delivered directly to you. Enjoy the convenience of supporting your
            community while indulging in a variety of handpicked, seasonal
            fruits that are sourced locally.
          </p>
          <div className="button-wrapper">
            <button className="banner-button">Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
