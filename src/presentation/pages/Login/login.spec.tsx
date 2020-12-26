import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Login from '.';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => ({
  sut: render(<Login />),
});

describe('Login Page', () => {
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
});
