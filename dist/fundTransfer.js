"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const authentication_1 = require("./services/authentication");
class FundTransfer {
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.apiPrefix = '/fundtransfer';
        this.common = new common_1.Common();
    }
    withdrawCrypto(amount, address, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                amount,
                address,
                currency: currency.toUpperCase(),
            };
            body.amount = this.common.convertFigure(true, body.amount);
            const r = authentication_1.createHmac(`${this.apiPrefix}/withdrawCrypto`, this.publicKey, this.privateKey, null, body);
            return this.common.request('POST', r.path, null, body, r.headers);
        });
    }
    withdrawETF(accountName, bankName, bsbNumber, accountNumber, currency, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                accountName,
                accountNumber,
                bankName,
                bsbNumber,
                amount,
                currency: currency.toUpperCase(),
            };
            body.amount = this.common.convertFigure(true, body.amount);
            const r = authentication_1.createHmac(`${this.apiPrefix}/withdrawEFT`, this.publicKey, this.privateKey, null, body);
            return this.common.request('POST', r.path, null, body, r.headers);
        });
    }
    history(limit, since, indexForward) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                limit: limit ? (limit > 200 ? 200 : limit) : null,
                since,
                indexForward,
            };
            const r = authentication_1.createHmac(`${this.apiPrefix}/history`, this.publicKey, this.privateKey, qs, null, true);
            const response = yield this.common.request('GET', r.path, qs, null, r.headers);
            response.fundTransfers = response.fundTransfers.map(ft => this.common.adjustBalance(ft, ['amount', 'fee']));
            if (response.paging) {
                const adjustment = {
                    limit: 'number',
                    since: 'number',
                    indexForward: 'boolean',
                };
                response.paging = this.common.convertType(response.paging, adjustment);
            }
            return response;
        });
    }
}
exports.FundTransfer = FundTransfer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZFRyYW5zZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Z1bmRUcmFuc2Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUNBQWtDO0FBQ2xDLDhEQUF1RDtBQUt2RDtJQU9FLFlBQ0UsU0FBa0IsRUFDbEIsVUFBbUI7UUFFbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFFN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7UUFFakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFWSxjQUFjLENBQUMsTUFBYyxFQUFFLE9BQWUsRUFBRSxRQUFnQjs7WUFDM0UsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsTUFBTTtnQkFDTixPQUFPO2dCQUNQLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFO2FBQ2pDLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0QsTUFBTSxDQUFDLEdBQUcsMkJBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFdEcsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRSxDQUFDO0tBQUE7SUFFWSxXQUFXLENBQ3RCLFdBQW1CLEVBQ25CLFFBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLGFBQXFCLEVBQ3JCLFFBQWdCLEVBQ2hCLE1BQWM7O1lBRWQsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsV0FBVztnQkFDWCxhQUFhO2dCQUNiLFFBQVE7Z0JBQ1IsU0FBUztnQkFDVCxNQUFNO2dCQUNOLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFO2FBQ2pDLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0QsTUFBTSxDQUFDLEdBQUcsMkJBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRW5HLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsQ0FBQztLQUFBO0lBRVksT0FBTyxDQUFDLEtBQWMsRUFBRSxLQUFjLEVBQUUsWUFBc0I7O1lBQ3pFLE1BQU0sRUFBRSxHQUFHO2dCQUNULEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDakQsS0FBSztnQkFDTCxZQUFZO2FBQ2IsQ0FBQztZQUVGLE1BQU0sQ0FBQyxHQUFHLDJCQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbkcsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvRSxRQUFRLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1RyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLE1BQU0sVUFBVSxHQUFHO29CQUNqQixLQUFLLEVBQUUsUUFBUTtvQkFDZixLQUFLLEVBQUUsUUFBUTtvQkFDZixZQUFZLEVBQUUsU0FBUztpQkFDeEIsQ0FBQztnQkFFRixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDeEU7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7Q0FDRjtBQWxGRCxvQ0FrRkMifQ==