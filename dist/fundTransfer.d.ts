import { Withdraw } from './interfaces/fundTransfer/withdraw.interface';
export declare class FundTransfer {
    private common;
    private apiPrefix;
    private publicKey;
    private privateKey;
    constructor(publicKey?: string, privateKey?: string);
    withdrawCrypto(amount: number, address: string, currency: string): Promise<Withdraw>;
    withdrawETF(accountName: string, accountNumber: string, bankName: string, bsbNumber: string, amount: number, currency: string): Promise<Withdraw>;
    history(limit?: number, since?: number, indexForward?: boolean): Promise<any>;
}
