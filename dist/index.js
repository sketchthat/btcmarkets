"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("./account");
const common_1 = require("./common");
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
        this.commonClass = new common_1.Common();
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
    getFloat() {
        return this.commonClass.accountFloat;
    }
}
exports.BTCMarkets = BTCMarkets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFDcEMscUNBQWtDO0FBQ2xDLGlEQUE4QztBQUM5QyxxQ0FBa0M7QUFDbEMsdUNBQW9DO0FBQ3BDLCtDQUE0QztBQUU1QztJQVFFLFlBQ0UsU0FBa0IsRUFDbEIsVUFBbUI7UUFFbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGlCQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLDJCQUFZLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksaUJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUkseUJBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7QUEzQ0QsZ0NBMkNDIn0=