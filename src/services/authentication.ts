import * as crypto from 'crypto';

import { HmacResponse } from '../interfaces/hmacResponse.interface';

export function createHmac(path: string, publicApiKey: string, privateApiKey: string): HmacResponse {
  const nonce = new Date().valueOf();

  const message = [
    path,
    nonce,
  ];

  const signature = crypto.createHmac('sha512', new Buffer(privateApiKey, 'base64'))
    .update(message.join('\n') + '\n')
    .digest('base64');

  return {
    headers: {
      apiKey: publicApiKey,
      timestamp: nonce,
      signature,
    },
    path: path,
  };
}
