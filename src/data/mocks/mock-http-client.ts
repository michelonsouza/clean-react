import {
  HttpPostParams,
  HttpPostClient,
} from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  body?: Record<string, unknown>;

  async post({ url, body }: HttpPostParams): Promise<void> {
    this.url = url;
    this.body = body;

    return Promise.resolve();
  }
}
