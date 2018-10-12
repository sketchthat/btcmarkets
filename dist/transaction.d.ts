import { History } from './interfaces/transaction/history.interface';
export declare class Transaction {
    private common;
    private apiPrefix;
    private publicKey;
    private privateKey;
    constructor(publicKey?: string, privateKey?: string);
    history(currency?: string, since?: number, indexForward?: boolean, sortForward?: boolean): Promise<History>;
}
