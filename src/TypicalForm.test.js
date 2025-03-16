import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TypicalForm from "./typicalForm";

beforeAll(() => {
  Object.defineProperty(global, "navigator", {
    value: { clipboard: { writeText: jest.fn() } },
    writable: true,
  });
});

describe("TypicalForm Component", () => {
  test("renders form correctly", () => {
    render(<TypicalForm />);

    // Check if input fields exist
    expect(screen.getByPlaceholderText("customer name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("mobile")).toBeInTheDocument();

    // Check if submit button exists
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("updates input fields on typing", async () => {
    render(<TypicalForm />);

    const nameInput = screen.getByPlaceholderText("customer name");
    const mobileInput = screen.getByPlaceholderText("mobile");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(mobileInput, "1234567890");

    expect(nameInput).toHaveValue("John Doe");
    expect(mobileInput).toHaveValue("1234567890");
  });

  test("displays validation errors on empty submit", async () => {
    render(<TypicalForm />);

    // Click submit button
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check for validation errors
    expect(
      await screen.findByText("Customer Name is required")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Mobile number is required")
    ).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    console.log = jest.fn(); // Mock console.log

    render(<TypicalForm />);

    const nameInput = screen.getByPlaceholderText("customer name");
    const mobileInput = screen.getByPlaceholderText("mobile");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(mobileInput, "1234567890");

    // Click submit button
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Ensure form submission message is logged

    expect(console.log).toHaveBeenCalledWith("form data is valid", {
      CustomerName: "John Doe",
      mobile: "1234567890",
    });
  });
});
