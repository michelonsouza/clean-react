import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  RenderResult,
} from '@testing-library/react';
import faker from 'faker';

import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/mocks';
import { ValidationSpy } from '@/presentation/mocks';

import Login from '.';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();

  params: AuthenticationParams = {} as AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;

    return Promise.resolve(this.account);
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (errorMessage = ''): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = errorMessage;

  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />,
  );

  return {
    sut,
    validationSpy,
    authenticationSpy,
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

  it('should be disabled button on start', () => {
    const {
      sut: { getByTestId },
    } = makeSut(faker.random.words());
    const submitButton = getByTestId('submit-button') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  it('should be input status as required on start', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut(faker.random.words());
    const emailStatus = getByTestId('email-status');
    const passwordStatus = getByTestId('password-status');

    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should call validation with correct email', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const emailInput = getByTestId('email');
    const email = faker.internet.email();

    fireEvent.input(emailInput, { target: { value: email } });

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  it('should call validation with correct password', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const passwordInput = getByTestId('password');
    const password = faker.internet.password();

    fireEvent.input(passwordInput, { target: { value: password } });

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  it('should email error if validation fails', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut(faker.random.words());
    const emailInput = getByTestId('email');

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = getByTestId('email-status');

    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('should password error if validation fails', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut(faker.random.words());
    const passwordInput = getByTestId('password');

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = getByTestId('password-status');

    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should show valid state if email Validation success', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const emailInput = getByTestId('email');

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const emailStatus = getByTestId('email-status');

    expect(emailStatus.title).toBe('Tudo certo');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('should show valid state if password Validation success', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const passwordInput = getByTestId('password');

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = getByTestId('password-status');

    expect(passwordStatus.title).toBe('Tudo certo');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  it('should show spinner on submit', () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const passwordInput = getByTestId('password');
    const emailInput = getByTestId('email');

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const button = getByTestId('submit-button');

    fireEvent.click(button);

    const spinner = getByTestId('spinner-loading');

    expect(spinner).toBeTruthy();
  });

  it('should show spinner on submit', () => {
    const {
      sut: { getByTestId },
      authenticationSpy,
    } = makeSut();
    const passwordInput = getByTestId('password');
    const emailInput = getByTestId('email');
    const email = faker.internet.email();
    const password = faker.internet.password();

    fireEvent.input(emailInput, {
      target: { value: email },
    });

    fireEvent.input(passwordInput, {
      target: { value: password },
    });

    const button = getByTestId('submit-button');

    fireEvent.click(button);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
