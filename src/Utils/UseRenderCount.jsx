import React from "react";
import { useFormContext } from "react-hook-form";

const GetRenderCount = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext(); // Access form context

  return (
    <div>
      <input
        type="text"
        {...register("email", { required: "Email is required" })}
        placeholder="Enter Email"
      />
      {/* Error Handling */}
      <p>{errors.email?.message}</p>

      {/* Display the current value of email */}
      <p>Current Value: {getValues("email")}</p>
    </div>
  );
};

export default GetRenderCount;
