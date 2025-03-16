import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GetRenderCount } from "./Utils/UseRenderCount";

const RenderCount = GetRenderCount();
const FoodDeliveryForm = () => {
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, formState, control } = useForm({
    mode: "onSubmit",
    disabled,
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "kaleem",
      mobile: 4169887294,
      email: "",
      paymentMethod: "",
      deliveryIn: "",
    },
  });
  const onSubmit = (data) => {
    setDisabled(true);
    setTimeout(() => {
      console.log(data);
    }, 20000);

    setDisabled(false);
  };

  const onError = (error) => {
    console.log("error is", error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <RenderCount />
      <div className="row mb-2">
        <div className="col">
          {" "}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Order number"
              {...register("orderNo")}
              disabled
            />

            <label>Order Number</label>
          </div>
        </div>
        <div className="col">
          {" "}
          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              placeholder="mobile"
              {...register("mobile", {
                required: { value: true, message: "this is mandatory" },
                minLength: { value: 10, message: "Minimum length is 10" },
              })}
            />
            <label>Mobile Name</label>
            {formState.errors.mobile && (
              <div className="error-feedback">
                {formState.errors.mobile?.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          {" "}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="customer name"
              {...register("customerName", {
                required: "this is required",
              })}
            />

            <label>Customer Name</label>
            {formState.errors.customerName?.message}
          </div>
        </div>
        <div className="col">
          {" "}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email")}
            />

            <label>Email</label>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <div className="form-floating">
            <select className="form-select" {...register("paymentMethod")}>
              <option value="">Select</option>
              <option value="online">Paid Online</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <label>Payment method</label>
          </div>
        </div>
      </div>
      <hr></hr>
      <Controller
        control={control}
        render={({ field }) => <input disabled={field.disabled} />}
        name="test"
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FoodDeliveryForm;
