import React, { useState } from "react";
import GetRenderCount from "./Utils/UseRenderCount";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import TextField from "@mui/material/TextField";

// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

const TypicalForm = () => {
  // const [values, setValues] = useState({ CustomerName: "", mobile: "" });

  // const [FormError, setErrors] = useState({ CustomerName: "", mobile: "" });

  // const phoneRegExp = /^(\+1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}$/;
  // const schema = yup.object({
  //   CustomerName: yup.string().required("Customer Name is required"),
  //   mobile: yup.string().required("Mobile number is required"),
  // });

  // const validateFormData = () => {
  //   let TempErrors = {
  //     CustomerName: "",
  //     mobile: "",
  //   };
  //   if (values.CustomerName === "") {
  //     TempErrors.CustomerName = "Customer Name is required";
  //   }
  //   if (values.mobile === "") {
  //     TempErrors.mobile = "Mobile number is required";
  //   }
  //   setErrors(TempErrors);
  //   return Object.values(TempErrors).every((err) => err === "");
  // };

  // const handleValue = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // };

  // Step 1: Initialize `useForm`
  const methods = useForm({
    defaultValues: {
      CustomerName: "kaleemullah khan",
      mobile: "4169887294",
      firstName: "kaleemullah",
      email: "kaleemullah19@gmail.com",
    },
  });

  // Step 2: Extract needed functions
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = methods;

  // Step 3: Handle form submission
  const submitForm = (data) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitForm)}>
        <GetRenderCount />
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="customer name"
            name="CustomerName"
            {...register("CustomerName", {
              required: "CustomerName is required",
            })}
          />

          <label>Customer Name</label>
          <p>{errors.CustomerName?.message}</p>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="mobile"
            name="mobile"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits!",
              },
            })}
          />
          <label>Mobile Number</label>
          <p>{errors.mobile?.message}</p>
        </div>
        <button
          type="button"
          onClick={() => setValue("CustomerName", "Kaleemullah Khan")}
        >
          Set Name
        </button>
        <button type="button" onClick={() => alert(getValues("CustomerName"))}>
          Get Name
        </button>
        <hr />

        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: "First Name is required" }}
          render={({ field, fieldState }) => (
            <>
              <TextField {...field} label="First Name" variant="outlined" />
              <p>{fieldState.error?.message}</p>
            </>
          )}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default TypicalForm;
