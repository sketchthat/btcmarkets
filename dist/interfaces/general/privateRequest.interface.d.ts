export interface IPrivateRequest {
    uri: string;
    headers: {
        apiKey: string;
        timestamp: number;
        signature: string;
    };
    json: boolean;
    qs?: any;
}
