// import React from "react";
// import { Link } from "react-router-dom";
// import "./productList.css"; // Import the CSS file for styling

// function ProductList() {
//   return (
//     <div className="product-page">
//       <h1 className="page-header">Our Products</h1>
//       <div className="product-container">
//         {/* Fruits Card */}
//         <div className="product-card">
//           {/* <img src={fruitsImg} alt="Fruits" className="product-image" /> */}
//           <h2 className="product-title">Fruits</h2>
//           <Link to="/fruitsection">
//             <button className="product-button">Shop Now</button>
//           </Link>
//         </div>

//         {/* Exotic Veggies Card */}
//         <div className="product-card">
//           {/* <img src={veggiesImg} alt="Exotic Veggies" className="product-image" /> */}
//           <h2 className="product-title">Exotic Veggies</h2>
//           <Link to="/veggiesection">
//             <button className="product-button">Shop Now</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductList;
import React from "react";
import { Link } from "react-router-dom";
import "./productList.css"; // Import the CSS file for styling

function ProductList() {
  return (
    <div className="product-page">
      <h1 className="page-header">Our Products</h1>

      <div className="product-container">
        <div className="section">
          <h2 className="fruits-header">Fruits</h2> {/* Updated header class */}
          <div className="product-card fruit-card">
            <Link to="/fruitsection">
              <button className="product-button">Shop Now</button>
            </Link>
          </div>
        </div>

        <div className="section">
          <h2 className="veggies-header">Exotic Veggies</h2>{" "}
          {/* Updated header class */}
          <div className="product-card veggie-card">
            <Link to="/veggiesection">
              <button className="product-button">Shop Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
