import React from 'react';
import { useForm } from 'react-hook-form';
import { isValidName, isValidPassword } from '../utils/validators.utils';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let submissionErrors = {};

        if (!isValidName(data.firstName)) {
            submissionErrors.firstName = "First name can only contain letters, hyphens, apostrophes, and spaces";
        }

        if (!isValidName(data.lastName)) {
            submissionErrors.lastName = "Last name can only contain letters, hyphens, apostrophes, and spaces";
        }

        if (!isValidPassword(data.password)) {
            submissionErrors.password = "Password must have at least 8 characters, one uppercase, one lowercase, and one number";
        }

        if (Object.keys(submissionErrors).length === 0) {
            try {
                const url = `${import.meta.env.VITE_API_ENDPOINT}authenticate/signup`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                console.log(response.json())

                if (response.ok) {
                    navigate('/login');
                } else {
                    // Handle server-side errors
                }
            } catch (error) {
                console.error("Error during signup:", error);
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="signup-form border grey-border p-5 rounded">
                <h3 className="text-center mt-5">Signup</h3>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Email"
                            className="form-control" />
                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </div>
                    <div className="mb-3">
                        <input {...register("firstName", { required: "First name is required" })}
                            type="text"
                            placeholder="First Name"
                            className="form-control" />
                        {errors.firstName && <div className="text-danger">{errors.firstName.message}</div>}
                    </div>
                    <div className="mb-3">
                        <input {...register("lastName", { required: "Last name is required" })}
                            type="text"
                            placeholder="Last Name"
                            className="form-control" />
                        {errors.lastName && <div className="text-danger">{errors.lastName.message}</div>}
                    </div>
                    <div className="mb-3">
                        <input {...register("password", { required: "Password is required" })}
                            type="password"
                            placeholder="Password"
                            className="form-control" />
                        {errors.password && <div className="text-danger">{errors.password.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
