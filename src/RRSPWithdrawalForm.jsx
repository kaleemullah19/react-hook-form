import React from "react";
import { useForm } from "react-hook-form";

const RRSPWithdrawalForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      fromAccount: "",
      toAccount: "",
      amount: "",
      fullWithdrawal: false,
      taxOption: "",
    },
  });

  const fromAccountValue = watch("fromAccount");
  const toAccountValue = watch("toAccount");
  const fullWithdrawal = watch("fullWithdrawal");
  const enteredAmount = watch("amount");

  // Simulated Account Data
  const accountBalances = {
    rrsp_001: { balance: 5000, number: "123-001" },
    rrsp_002: { balance: 7000, number: "123-002" },
  };

  const nonRRSPAccounts = {
    checking: { balance: 3000, number: "456-789" },
    personal_savings: { balance: 8000, number: "987-654" },
  };

  // Handle Full Withdrawal checkbox
  const handleFullWithdrawalChange = (e) => {
    const isChecked = e.target.checked;
    setValue("fullWithdrawal", isChecked);

    if (isChecked && fromAccountValue) {
      setValue("amount", accountBalances[fromAccountValue]?.balance || "");
      setValue("taxOption", ""); // Remove Before/After Tax selection from submission
    } else {
      setValue("amount", "");
    }
  };

  const onSubmit = (data) => {
    // Remove taxOption from submission if Full Withdrawal is selected
    if (data.fullWithdrawal) {
      delete data.taxOption;
    }

    // Validate if amount is greater than available balance
    if (
      !fullWithdrawal &&
      fromAccountValue &&
      Number(data.amount) > accountBalances[fromAccountValue]?.balance
    ) {
      alert(
        "Error: The entered amount cannot exceed the available balance in the selected From Account."
      );
      return;
    }

    console.log("Submitted Data:", data);
  };

  return (
    <div className="container d-flex justify-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded bg-light"
        style={{ width: "400px" }}
      >
        <h4 className="text-center mb-4">RRSP Withdrawal Form</h4>

        {/* FROM ACCOUNT (Only RRSP Accounts) */}
        <div className="mb-3">
          <label className="form-label">From Account (RRSP)</label>
          <select
            className="form-select"
            {...register("fromAccount", { required: "Select an RRSP account" })}
            onChange={(e) => {
              const selectedAccount = e.target.value;
              setValue("fromAccount", selectedAccount);
              if (fullWithdrawal) {
                setValue(
                  "amount",
                  accountBalances[selectedAccount]?.balance || ""
                );
              }
              setValue("toAccount", ""); // Reset To Account when From Account changes
            }}
          >
            <option value="">Select RRSP Account</option>
            {Object.entries(accountBalances).map(([key, acc]) => (
              <option key={key} value={key}>
                {`iTrade RRSP - ${acc.number} ($${acc.balance})`}
              </option>
            ))}
          </select>
          {errors.fromAccount && (
            <div className="text-danger">{errors.fromAccount.message}</div>
          )}
        </div>

        {/* TO ACCOUNT (Disabled until From Account is selected) */}
        <div className="mb-3">
          <label className="form-label">To Account (Non-RRSP)</label>
          <select
            className="form-select"
            {...register("toAccount", {
              required: "Select a non-RRSP account",
            })}
            disabled={!fromAccountValue} // Disabled unless From Account is selected
          >
            <option value="">Select To Account</option>
            {Object.entries(nonRRSPAccounts).map(([key, acc]) => (
              <option key={key} value={key}>
                {`Account - ${acc.number} ($${acc.balance})`}
              </option>
            ))}
          </select>
          {errors.toAccount && (
            <div className="text-danger">{errors.toAccount.message}</div>
          )}
        </div>

        {/* AMOUNT FIELD (Now includes max validation) */}
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Amount"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
              validate: (value) =>
                !fromAccountValue ||
                fullWithdrawal ||
                Number(value) <= accountBalances[fromAccountValue]?.balance
                  ? true
                  : `Amount cannot exceed $${accountBalances[fromAccountValue]?.balance}`,
            })}
            disabled={fullWithdrawal}
          />
          {errors.amount && (
            <div className="text-danger">{errors.amount.message}</div>
          )}
        </div>

        {/* FULL AMOUNT WITHDRAWAL CHECKBOX */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("fullWithdrawal")}
            onChange={handleFullWithdrawalChange}
          />
          <label className="form-check-label">Full Amount Withdrawal</label>
        </div>

        {/* PARTIAL WITHDRAWAL OPTIONS (Hidden & Removed from Submission if Full Withdrawal is checked) */}
        {!fullWithdrawal && (
          <div className="mb-3">
            <strong>Choose Withdrawal Type:</strong>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="beforeTax"
                {...register("taxOption", { required: "Select a tax option" })}
              />
              <label className="form-check-label">Before Tax</label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="afterTax"
                {...register("taxOption", { required: "Select a tax option" })}
              />
              <label className="form-check-label">After Tax</label>
            </div>

            {errors.taxOption && (
              <div className="text-danger">{errors.taxOption.message}</div>
            )}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RRSPWithdrawalForm;
