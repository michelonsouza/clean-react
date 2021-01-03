import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';
import faker from 'faker';

import { SignUp } from '@/presentation/pages';

const history = createMemoryHistory({
  initialEntries: ['/signup'],
});

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <SignUp />
    </Router>,
  );
  return {
    sut,
  };
};

const testChildCount = (
  sut: RenderResult,
  elementTestId: string,
  count: number,
): void => {
  const element = sut.getByTestId(elementTestId);
  expect(element.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  buttonTestId: string,
  isDisabled = true,
): void => {
  const button = sut.getByTestId(buttonTestId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
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

describe('SingUp Page', () => {
  it('should not render error message on start', () => {
    const { sut } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
  });

  it('should be disabled button on start', () => {
    const { sut } = makeSut();

    testButtonIsDisabled(sut, 'signup-button');
  });

  it('should be input status as required on start', () => {
    const validationError = 'Campo Obrigatório';
    const { sut } = makeSut();

    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
