export interface HmacResponse {
    headers: HmacHeaders;
    path: string;
}
export interface HmacHeaders {
    apiKey: string;
    timestamp: number;
    signature: string;
}
