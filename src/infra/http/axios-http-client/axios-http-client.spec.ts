import axios from 'axios';
import faker from 'faker';
import { HttpPostParams } from '../../../data/protocols/http/http-post-client';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number(),
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  it('shoud call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('shoud return the correct statusCode and body', async () => {
    const sut = makeSut();

    const httpResponse = await sut.post(mockPostRequest());

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});

export default {};
