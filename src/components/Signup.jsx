import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
        ...previousData,
        [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event);
  }

  return (
    <div>
      <h2>Signup for Innovtask</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          onChange={(event) => handleChange(event)}
          required
        />
        <input
          name="firstName"
          type="text"
          value={formData.firstName}
          placeholder="First Name"
          onChange={(event) => handleChange(event)}
          required
        />
        <input
          name="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={(event) => handleChange(event)}
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={(event) => handleChange(event)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
