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

import {
  ValidationSpy,
  AddAccountSpy,
  populateField,
  testChildCount,
  testButtonIsDisabled,
  testStatusForField,
  testElementExists,
} from '@/presentation/mocks';
import { SignUp } from '@/presentation/pages';

const history = createMemoryHistory({
  initialEntries: ['/signup'],
});

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  addAccountSpy: AddAccountSpy;
};

const makeSut = (errorMessage = ''): SutTypes => {
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new AddAccountSpy();
  validationSpy.errorMessage = errorMessage;

  const sut = render(
    <Router history={history}>
      <SignUp validation={validationSpy} addAccount={addAccountSpy} />
    </Router>,
  );
  return {
    sut,
    validationSpy,
    addAccountSpy,
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
});
