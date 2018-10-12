import { HmacResponse } from '../interfaces/hmacResponse.interface';
export declare function createHmac(path: string, publicApiKey: string, privateApiKey: string, qs?: object, body?: object): HmacResponse;
