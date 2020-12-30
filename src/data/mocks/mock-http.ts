import faker from 'faker';

import {
  HttpResponse,
  HttpStatusCode,
  HttpPostParams,
  HttpPostClient,
} from '@/data/protocols/http';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;

  body?: T;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = url;
    this.body = body;

    return this.response;
  }
}
