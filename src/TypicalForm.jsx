import React, { useState } from "react";
import { GetRenderCount } from "./Utils/UseRenderCount";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const RenderCount = GetRenderCount();
const TypicalForm = () => {
  // const [values, setValues] = useState({ CustomerName: "", mobile: "" });

  // const [FormError, setErrors] = useState({ CustomerName: "", mobile: "" });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    CustomerName: yup.string().required("Customer Name is required"),
    mobile: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
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
  } = useForm({
    resolver: yupResolver(schema),
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
        <label>Mobile Name</label>
        <p>{errors.mobile?.message}</p>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TypicalForm;
