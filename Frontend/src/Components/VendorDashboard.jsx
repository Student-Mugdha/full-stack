import React from "react";
import { Link } from "react-router-dom";
import "./VendorDashboard.css";
import VendorNavbar from "./VendorNavbar";

const VendorDashboard = () => {
  return (
    <>
      <VendorNavbar />
      <div className="vendor-dashboard">
        <h1 className="dashboard-title">Welcome, Vendor!</h1>
        <p className="dashboard-description">
          Manage your products, view and track orders.
        </p>

        <div className="cards-container">
          <div className="card">
            <h3 className="card-title">Manage Products</h3>
            <p className="card-description">
              Add, edit, or remove products from your inventory.
            </p>
            <Link to="/addproduct">
              <button className="card-button">Add Products</button>
            </Link>
          </div>

          <div className="card">
            <h3 className="card-title">Orders</h3>
            <p className="card-description">
              View and manage your customer orders.
            </p>
            <Link to="/vieworders">
              <button className="card-button">View Orders</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
