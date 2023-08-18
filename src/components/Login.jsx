import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuthentication();

  const onSubmit = async (data) => {
    try {
      const url = `${import.meta.env.VITE_API_ENDPOINT}authenticate/login`; // Updated endpoint to login
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (response.ok) {
        login(responseData.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form border grey-border p-5 rounded">
        <h3 className="text-center mt-5">Login</h3>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="form-control"
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="form-control"
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn bt-bg-blue-green">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
