import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { HttpPostParams, HttpResponse } from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post({ url, body }: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>;

    try {
      httpResponse = await axios.post(url, body);
    } catch ({ response }) {
      httpResponse = response;
    }

    return {
      body: httpResponse.data,
      statusCode: httpResponse.status,
    };
  }
}
