import { HmacHeaders } from './interfaces/hmacResponse.interface';
export declare class Common {
    private accountFloat;
    private uri;
    constructor();
    request(method: string, path: string, qs?: object, body?: object, headers?: HmacHeaders): Promise<any>;
    adjustBalance(item: any, figures: string[]): any;
    convertFigure(sendFigure: boolean, figure: number): number;
    private buildParams;
}