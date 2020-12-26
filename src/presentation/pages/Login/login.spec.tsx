import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  RenderResult,
} from '@testing-library/react';

import { Validation } from '@/presentation/protocols/validation';

import Login from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage = '';

  fieldName = '';

  fieldValue = '';

  validate(fieldName: string, fieldValue: string): string | null {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;

    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy,
  };
};

describe('Login Page', () => {
  afterEach(cleanup);

  it('should not render error message on start', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const errorWrap = getByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(0);
  });

  it('should be desabled button on start', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const submitButton = getByTestId('button') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  it('should be input status as required on start', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const emailStatus = getByTestId('email-status');
    const passwordStatus = getByTestId('password-status');

    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should call validation with correct email', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const emailInput = getByTestId('email');

    fireEvent.input(emailInput, { target: { value: 'any_email' } });

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe('any_email');
  });

  it('should call validation with correct password', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const passwordInput = getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: 'any_password' } });

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe('any_password');
  });
});
