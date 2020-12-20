import { HttpPostParams } from '@/data/protocols/http/http-post-client';
import axios from 'axios';

export class AxiosHttpClient {
  async post({ url }: HttpPostParams<any>): Promise<void> {
    await axios.post(url);
  }
}
