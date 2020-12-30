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

import { InvalidCredentialsError } from '@/domain/errors';
import {
  ValidationSpy,
  AuthenticationSpy,
  SaveAccessTokenMock,
} from '@/presentation/mocks';

import { Login } from '@/presentation/pages';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

const history = createMemoryHistory({
  initialEntries: ['/login'],
});

const makeSut = (errorMessage = ''): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationSpy.errorMessage = errorMessage;

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationSpy}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>,
  );

  return {
    sut,
    validationSpy,
    authenticationSpy,
    saveAccessTokenMock,
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

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const form = sut.getByTestId('login-form') as HTMLButtonElement;

  fireEvent.submit(form);

  await waitFor(() => form);
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const status = sut.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
};

const testElementText = (
  sut: RenderResult,
  elementTestId: string,
  text: string,
): void => {
  const element = sut.getByTestId(elementTestId);
  expect(element.textContent).toBe(text);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  buttonTestId: string,
  isDisabled = true,
): void => {
  const button = sut.getByTestId(buttonTestId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
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
    const { sut } = makeSut(faker.random.words());

    testButtonIsDisabled(sut, 'submit-button');
  });

  it('should be input status as required on start', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    testStatusForField(sut, 'email', validationSpy.errorMessage);
    testStatusForField(sut, 'password', validationSpy.errorMessage);
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
    testStatusForField(sut, 'email', validationSpy.errorMessage);
  });

  it('should password error if validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populatePasswordField(sut);
    testStatusForField(sut, 'password', validationSpy.errorMessage);
  });

  it('should show valid state if email Validation success', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    testStatusForField(sut, 'email');
  });

  it('should show valid state if password Validation success', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    testStatusForField(sut, 'password');
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner-loading');

    expect(spinner).toBeTruthy();
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', async () => {
    const { sut, authenticationSpy } = makeSut(faker.random.words());

    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit(sut);

    testElementText(sut, 'main-error', error.message);
    testElementText(sut, 'submit-button', 'Entrar');
  });

  it('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSubmit(sut);

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken,
    );

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  it('should go to signup page', () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup-link');

    fireEvent.click(signup);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
