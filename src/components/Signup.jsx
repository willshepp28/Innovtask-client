import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidName, isValidPassword } from "../utils/validators.utils";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [submissionErrors, setSubmissionErrors] = useState({});

  const onSubmit = async (data) => {
    setSubmissionErrors({});

    let newSubmissionErrors = {};

    if (!isValidName(data.firstName)) {
      newSubmissionErrors.firstName = "First name can only contain letters, hyphens, apostrophes, and spaces";
    }

    if (!isValidName(data.lastName)) {
      newSubmissionErrors.lastName = "Last name can only contain letters, hyphens, apostrophes, and spaces";
    }

    if (!isValidPassword(data.password)) {
      newSubmissionErrors.password =
        "Password must have at least 8 characters, one uppercase, one lowercase, and one number";
    }

    if (Object.keys(newSubmissionErrors).length === 0) {
      try {
        const url = `${import.meta.env.VITE_API_ENDPOINT}authenticate/signup`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          navigate("/login");
        } else {
          const responseData = await response.json();
          if (responseData.message) {
            setSubmissionErrors({ ...submissionErrors, server: responseData.message });
          } else {
            setSubmissionErrors({ ...submissionErrors, server: "An error occurred. Please try again later." });
          }
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setSubmissionErrors({ ...submissionErrors, server: "An error occurred. Please try again later." });
      }
    } else {
      setSubmissionErrors(newSubmissionErrors);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <div>
        {submissionErrors.email && (
          <div className="alert alert-danger" role="alert">
            {submissionErrors.email}
          </div>
        )}
        {submissionErrors.firstName && (
          <div className="alert alert-danger" role="alert">
            {submissionErrors.firstName}
          </div>
        )}
        {submissionErrors.lastName && (
          <div className="alert alert-danger" role="alert">
            {submissionErrors.lastName}
          </div>
        )}
        {submissionErrors.password && (
          <div className="alert alert-danger" role="alert">
            {submissionErrors.password}
          </div>
        )}
      </div>
      <div className="signup-form border grey-border p-5 rounded">
        <h4 className="text-center mt-5">Sign up for an account</h4>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("firstName", { required: "First name is required" })}
              type="text"
              placeholder="First Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              placeholder="Last Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn bt-bg-blue-green">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
