import { RenderResult, fireEvent } from '@testing-library/react';
import faker from 'faker';

export const testChildCount = (
  sut: RenderResult,
  elementTestId: string,
  count: number,
): void => {
  const element = sut.getByTestId(elementTestId);
  expect(element.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  sut: RenderResult,
  buttonTestId: string,
  isDisabled = true,
): void => {
  const button = sut.getByTestId(buttonTestId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const status = sut.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
};

export const populateField = (
  { getByTestId }: RenderResult,
  elementTestId: string,
  value = faker.random.word(),
): void => {
  const inputElement = getByTestId(elementTestId) as HTMLInputElement;
  fireEvent.input(inputElement, { target: { value } });
};

export const testElementExists = (
  sut: RenderResult,
  elementTestId: string,
): void => {
  expect(sut.getByTestId(elementTestId)).toBeTruthy();
};

export const testElementText = (
  sut: RenderResult,
  elementTestId: string,
  text: string,
): void => {
  const element = sut.getByTestId(elementTestId);
  expect(element.textContent).toBe(text);
};
