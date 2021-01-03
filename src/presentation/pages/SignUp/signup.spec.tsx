import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import faker from 'faker';

import { EmailInUseError } from '@/domain/errors';
import {
  ValidationSpy,
  AddAccountSpy,
  SaveAccessTokenMock,
  populateField,
  testChildCount,
  testButtonIsDisabled,
  testStatusForField,
  testElementExists,
  testElementText,
} from '@/presentation/mocks';
import { SignUp } from '@/presentation/pages';

const history = createMemoryHistory({
  initialEntries: ['/signup'],
});

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  addAccountSpy: AddAccountSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

const makeSut = (errorMessage = ''): SutTypes => {
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new AddAccountSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationSpy.errorMessage = errorMessage;

  const sut = render(
    <Router history={history}>
      <SignUp
        validation={validationSpy}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>,
  );
  return {
    sut,
    validationSpy,
    addAccountSpy,
    saveAccessTokenMock,
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
) => {
  populateField(sut, 'name', name);
  populateField(sut, 'email', email);
  populateField(sut, 'password', password);
  populateField(sut, 'passwordConfirmation', password);

  const form = sut.getByTestId('signup-form') as HTMLFormElement;

  fireEvent.submit(form);

  await waitFor(() => form);
};

describe('SingUp Page', () => {
  afterEach(cleanup);

  it('should not render error message on start', () => {
    const { sut } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
  });

  it('should be disabled button on start', () => {
    const { sut } = makeSut(faker.random.word());

    testButtonIsDisabled(sut, 'signup-button');
  });

  it('should be input status as required on start', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut(validationError);

    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  it('should show name error if Validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populateField(sut, 'name');
    testStatusForField(sut, 'name', validationSpy.errorMessage);
  });

  it('should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populateField(sut, 'email');
    testStatusForField(sut, 'email', validationSpy.errorMessage);
  });

  it('should show password error if Validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populateField(sut, 'password');
    testStatusForField(sut, 'password', validationSpy.errorMessage);
  });

  it('should show passwordConfirmation error if Validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populateField(sut, 'passwordConfirmation');
    testStatusForField(sut, 'passwordConfirmation', validationSpy.errorMessage);
  });

  it('should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, 'name');
    testStatusForField(sut, 'name');
  });

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, 'email');
    testStatusForField(sut, 'email');
  });

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, 'password');
    testStatusForField(sut, 'password');
  });

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, 'passwordConfirmation');
    testStatusForField(sut, 'passwordConfirmation');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateField(sut, 'name');
    populateField(sut, 'email');
    populateField(sut, 'password');
    populateField(sut, 'passwordConfirmation');

    testButtonIsDisabled(sut, 'signup-button', false);
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);

    testElementExists(sut, 'spinner-loading');
  });

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  it('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(addAccountSpy.callsCount).toBe(1);
  });

  it('should not call AddAccount if form is invalid', async () => {
    const { sut, addAccountSpy } = makeSut(faker.random.words());

    await simulateValidSubmit(sut);

    expect(addAccountSpy.callsCount).toBe(0);
  });

  it('should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut();
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);

    await simulateValidSubmit(sut);

    testElementText(sut, 'main-error', error.message);
    testElementText(sut, 'signup-button', 'Criar conta');
  });

  it('should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSubmit(sut);

    expect(saveAccessTokenMock.accessToken).toBe(
      addAccountSpy.account.accessToken,
    );

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  it('should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new EmailInUseError();
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error);

    await simulateValidSubmit(sut);

    testElementText(sut, 'main-error', error.message);
    testElementText(sut, 'signup-button', 'Criar conta');
  });

  it('should go to login page', () => {
    const { sut } = makeSut();
    const signInLink = sut.getByTestId('signin-link');

    fireEvent.click(signInLink);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/login');
  });
});
