import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function VendorLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const vendorInfo = {
      vendorEmail: data.vendorEmail,
      vendorPassword: data.vendorPassword,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/login/vendor",
        vendorInfo,
        { withCredentials: true }
      );

      if (res.data) {
        toast.success("Logged in Successfully");
        localStorage.setItem("Vendors", JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate("/VendorDashboard");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error(
              "Invalid input. Please check the fields and try again."
            );
            break;
          case 401:
            toast.error("Unauthorized: Incorrect email or password.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error("Not Found.");
        }
      } else {
        toast.error(
          "No response from the server. Please check your connection."
        );
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link
              to="/vendordashboard"
              className="btn-close"
              onClick={() => document.getElementById("my_modal_4").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input-field ${errors.vendorEmail ? "error" : ""}`}
                {...register("vendorEmail", { required: true })}
              />
              {errors.vendorEmail && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input-field ${
                  errors.vendorPassword ? "error" : ""
                }`}
                {...register("vendorPassword", { required: true })}
              />
              {errors.vendorPassword && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="button-group">
              <button className="login-button">Login</button>
              <p className="signup-link">
                Not registered?{" "}
                <Link to="/register/vendor" className="underline">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* CSS styles */}
        <style>{`
          /* Modal Styles */
          .modal {
            backdrop-filter: blur(8px);
          }

          .modal-box {
            border-radius: 10px;
            padding: 30px;
            background-color: #1e1e2f;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.5s ease;
          }

          /* Close Button */
          .btn-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: #fff;
          }

          /* Input Group */
          .input-group {
            margin-top: 20px;
          }

          .input-field {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 5px;
            transition: border 0.3s ease, box-shadow 0.3s ease;
          }

          .input-field:focus {
            outline: none;
            box-shadow: 0 0 5px #28a745;
          }

          .input-field.error {
            border: 2px solid red;
          }

          /* Error Message */
          .error-message {
            font-size: 0.9rem;
            color: red;
          }

          /* Button Styles */
          .button-group {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
          }

          .login-button {
            background: linear-gradient(90deg, #ff4e50, #fc6c7c);
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.2rem;
            transition: background 0.3s ease, transform 0.2s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          }

          .login-button:hover {
            background: linear-gradient(90deg, #fc6c7c, #ff4e50);
            transform: translateY(-2px);
          }

          /* Signup Link */
          .signup-link {
            color: #fff;
            font-size: 1rem;
          }

          /* Animation */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Toast Notification Styles */
          .react-toastify__toast {
            background-color: #333; /* Dark background for the toast */
            color: #fff; /* White text for better readability */
            border-radius: 5px; /* Rounded corners */
            padding: 10px; /* Padding for the toast */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Shadow effect */
          }

          .react-toastify__toast--success {
            background-color: #28a745; /* Green background for success */
          }

          .react-toastify__toast--error {
            background-color: #dc3545; /* Red background for error */
          }
        `}</style>
      </dialog>
    </div>
  );
}

export default VendorLogin;
