import * as crypto from 'crypto';
import * as querystring from 'querystring';

import { HmacResponse } from '../interfaces/hmacResponse.interface';

export function createHmac(
  path: string,
  publicApiKey: string,
  privateApiKey: string,
  qs?: object,
  body?: object,
): HmacResponse { // , post?: object
  qs = buildParams(qs);

  const nonce = new Date().valueOf();

  const message: any[] = [
    path,
  ];

  if (path.match(/^\/v2\//)) {
    // v2 Authentication
    const stringQs = querystring.stringify(qs);

    if (Object.keys(qs).length > 0) {
      message.push(stringQs);
    }
  }

  message.push(nonce);

  let signatureParams = message.join('\n') + '\n';

  const stringBody = JSON.stringify(body);

  if (body && Object.keys(body).length > 0) {
    message.push(stringBody);

    signatureParams = message.join('\n');
  }

  const signature = crypto.createHmac('sha512', new Buffer(privateApiKey, 'base64'))
      .update(signatureParams)
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

function buildParams(params: any): any {
  const returnParams = {};

  if (params) {
    Object.keys(params)
      .forEach(key => {
        if (params[key]) {
          returnParams[key] = params[key];
        }
      });
  }

  return returnParams;
}
