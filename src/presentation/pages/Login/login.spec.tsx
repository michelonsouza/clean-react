import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  fireEvent,
  cleanup,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import faker from 'faker';
import 'jest-localstorage-mock';

import { ValidationSpy, AuthenticationSpy } from '@/presentation/mocks';

import { InvalidCredentialsError } from '@/domain/errors';
import Login from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

const history = createMemoryHistory();

const makeSut = (errorMessage = ''): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = errorMessage;

  const sut = render(
    <Router history={history}>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>,
  );

  return {
    sut,
    validationSpy,
    authenticationSpy,
  };
};

const populateEmailField = (
  { getByTestId }: RenderResult,
  email = faker.internet.email(),
): void => {
  const emailInput = getByTestId('email') as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  { getByTestId }: RenderResult,
  password = faker.internet.password(),
): void => {
  const passwordInput = getByTestId('password') as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;

  fireEvent.click(submitButton);
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const status = sut.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('Login Page', () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

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
    const { sut, validationSpy } = makeSut(faker.random.words());

    simulateStatusForField(sut, 'email', validationSpy.errorMessage);
    simulateStatusForField(sut, 'password', validationSpy.errorMessage);
  });

  it('should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const email = faker.internet.email();

    populateEmailField(sut, email);

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  it('should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const password = faker.internet.password();

    populatePasswordField(sut, password);

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  it('should email error if validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populateEmailField(sut);
    simulateStatusForField(sut, 'email', validationSpy.errorMessage);
  });

  it('should password error if validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', validationSpy.errorMessage);
  });

  it('should show valid state if email Validation success', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    simulateStatusForField(sut, 'email');
  });

  it('should show valid state if password Validation success', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    simulateStatusForField(sut, 'password');
  });

  it('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner-loading');

    expect(spinner).toBeTruthy();
  });

  it('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', () => {
    const { sut, authenticationSpy } = makeSut(faker.random.words());

    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId('login-form'));

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    simulateValidSubmit(sut);

    const errorWrap = sut.getByTestId('error-wrap');

    await waitFor(() => errorWrap);

    const mainError = sut.getByTestId('main-error');
    const submitButton = sut.getByTestId('submit-button');

    expect(mainError.textContent).toBe(error.message);
    expect(submitButton.textContent).toBe('Entrar');
  });

  it('should add access token to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);

    await waitFor(() => sut.getByTestId('login-form'));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    );
  });

  it('should go to signup page', async () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup-link');

    fireEvent.click(signup);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
