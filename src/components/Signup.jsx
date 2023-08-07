import { useState } from "react";
import { isValidEmail, isValidName, isValidPassword } from "../utils/validators.utils";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = {};

    if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!isValidName(formData.firstName)) {
      errors.firstName = "First name can only contain letters, hyphens, apostrophes, and spaces";
    }

    if (!isValidName(formData.lastName)) {
      errors.lastName = "Last name can only contain letters, hyphens, apostrophes, and spaces";
    }

    if (!isValidPassword(formData.password)) {
      errors.password = "Password must have at least 8 characters, one uppercase, one lowercase, and one number";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form data submitted:", formData);
      // Here you can handle the form submission, like sending the data to your backend
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form border grey-border p-5 rounded">
        <h2 className="text-center mt-5">Signup for Innovtask</h2>
        <form className="mt-4" onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-3 ">
            <input
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={(event) => handleChange(event)}
              className="grey-border"
              required
            />
            {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
          </div>
          <div className="mb-3">
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              placeholder="First Name"
              onChange={(event) => handleChange(event)}
              className="grey-border"
              required
            />
            {formErrors.firstName && <div className="text-danger">{formErrors.firstName}</div>}
          </div>
          <div className="mb-3">
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={(event) => handleChange(event)}
              className="grey-border"
              required
            />
            {formErrors.lastName && <div className="text-danger">{formErrors.lastName}</div>}
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              value={formData.password}
              placeholder="Password"
              onChange={(event) => handleChange(event)}
              className="grey-border"
              required
            />
            {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
