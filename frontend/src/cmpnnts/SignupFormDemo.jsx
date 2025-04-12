import { useForm } from "react-hook-form";
import api from "../api/axios"; // Using centralized Axios instance
import { useState } from "react";

function SignupFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await api.post("/auth/signup", data);
      console.log("Signup successful:", response.data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signup failed. Please try again later.";
      setSubmitError(errorMessage);
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Create Account</h2>

      <div className="form-group">
        <label htmlFor="name">Username</label>
        <input
          id="username"
          {...register("name", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Must be less than 20 characters",
            },
          })}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="error-message" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="error-message" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Must be at least 8 characters",
            },
            validate: {
              hasNumber: (value) =>
                /\d/.test(value) || "Should contain at least one number",
              hasSpecialChar: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                "Should contain at least one special character",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="error-message" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {submitError && (
        <div className="error-message server-error" role="alert">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="success-message" role="alert">
          Signup successful! You can now log in.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="submit-button cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span> Processing...
          </>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
}

export default SignupFormDemo;
