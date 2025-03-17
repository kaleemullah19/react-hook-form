import React, { useState } from "react";
import { GetRenderCount } from "./Utils/UseRenderCount";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const RenderCount = GetRenderCount();
const TypicalForm = () => {
  // const [values, setValues] = useState({ CustomerName: "", mobile: "" });

  // const [FormError, setErrors] = useState({ CustomerName: "", mobile: "" });

  // const phoneRegExp = /^(\+1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}$/;
  const schema = yup.object().shape({
    CustomerName: yup.string().required("Customer Name is required"),
    mobile: yup
      .string()
      .matches(
        /^(\+1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}$/,
        "Mobile number is not valid"
      )
      .required("Mobile number is required"),
  });

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

  const submitForm = (data) => {
    console.log("Form Data Submitted:", data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      CustomerName: "kaleem",
      mobile: "416-988-7294",
    },
  });

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <RenderCount />
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="customer name"
          name="CustomerName"
          {...register("CustomerName")}
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
          {...register("mobile")}
        />
        <label>Mobile Number</label>
        <p>{errors.mobile?.message}</p>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TypicalForm;
