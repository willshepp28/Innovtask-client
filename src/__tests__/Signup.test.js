import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../components/Signup";
import { isValidName, isValidPassword } from "../utils/validators.utils";

// Mocking the navigation and the environmental variable
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: jest.fn(() => Promise.resolve({})),
  }),
);

describe("Signup Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Signup />);
  });

  it("displays validation error when invalid first name is submitted", async () => {
    const { getByPlaceholderText, getByRole } = render(<Signup />);
    const firstNameInput = getByPlaceholderText("First Name");
    userEvent.type(firstNameInput, "123InvalidName");
    const signupButton = getByRole("button", { name: /Sign Up/i });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(getByRole("alert")).toHaveTextContent(
        "First name can only contain letters, hyphens, apostrophes, and spaces",
      );
    });
  });

  // ...similar tests for last name, email, and password...

  it("submits form with valid data", async () => {
    const { getByPlaceholderText, getByRole } = render(<Signup />);

    userEvent.type(getByPlaceholderText("Email"), "test@example.com");
    userEvent.type(getByPlaceholderText("First Name"), "John");
    userEvent.type(getByPlaceholderText("Last Name"), "Doe");
    userEvent.type(getByPlaceholderText("Password"), "Password1");

    fireEvent.click(getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("authenticate/signup"),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });
  });

  // You can also add more tests for checking server errors, UI updates after server errors, etc.
});
