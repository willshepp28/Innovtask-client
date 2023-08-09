import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../components/Signup';


describe('Signup Component', () => {

  test.only('displays validation errors for invalid first name', () => {
    render(<Signup />);
  
    // Simulate inputting an invalid first name
    userEvent.type(screen.getByRole('textbox', { name: /firstName /i }), '123');
  
    // Use a custom text matching function
    const firstNameError = screen.getByText((content, element) => {
      const pattern = /First name can only contain letters, hyphens, apostrophes, and spaces/i;
      return pattern.test(content);
    });
  
    expect(firstNameError).toBeInTheDocument();
  });

  test('displays validation errors for invalid last name', () => {
    render(<Signup />);
    const signUpButton = screen.getByText('Sign Up');

    // Trigger form submission without filling inputs
    fireEvent.click(signUpButton);
    
    // Assert that the last name error message is displayed
    const lastNameError = screen.getByText(/Last name can only contain letters, hyphens, apostrophes, and spaces/i);
    expect(lastNameError).toBeInTheDocument();
  });

  test('displays validation errors for invalid password', () => {
    render(<Signup />);
    const signUpButton = screen.getByText('Sign Up');

    // Trigger form submission without filling inputs
    fireEvent.click(signUpButton);
    
    // Assert that the password error message is displayed
    const passwordError = screen.getByText(/Password must have at least 8 characters, one uppercase, one lowercase, and one number/i);
    expect(passwordError).toBeInTheDocument();
  });
  // Add more test cases as needed
});
