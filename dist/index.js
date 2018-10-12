"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("./account");
const fundTransfer_1 = require("./fundTransfer");
const market_1 = require("./market");
const trading_1 = require("./trading");
const transaction_1 = require("./transaction");
class BTCMarkets {
    constructor(publicKey, privateKey) {
        this.accountClass = new account_1.Account(publicKey, privateKey);
        this.fundTransferClass = new fundTransfer_1.FundTransfer(publicKey, privateKey);
        this.marketClass = new market_1.Market();
        this.tradingClass = new trading_1.Trading(publicKey, privateKey);
        this.transactionClass = new transaction_1.Transaction(publicKey, privateKey);
    }
    account() {
        return this.accountClass;
    }
    fundTransfer() {
        return this.fundTransferClass;
    }
    market() {
        return this.marketClass;
    }
    trading() {
        return this.tradingClass;
    }
    transaction() {
        return this.transactionClass;
    }
}
exports.BTCMarkets = BTCMarkets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFDcEMsaURBQThDO0FBQzlDLHFDQUFrQztBQUNsQyx1Q0FBb0M7QUFDcEMsK0NBQTRDO0FBRTVDO0lBT0UsWUFDRSxTQUFrQixFQUNsQixVQUFtQjtRQUVuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksaUJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksMkJBQVksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSx5QkFBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFyQ0QsZ0NBcUNDIn0=