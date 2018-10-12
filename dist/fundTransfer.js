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
            const r = authentication_1.createHmac(`${this.apiPrefix}/withdrawCrypto`, this.publicKey, this.privateKey, null, body);
            return this.common.request('POST', r.path, null, body, r.headers);
        });
    }
    withdrawETF(accountName, accountNumber, bankName, bsbNumber, amount, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                accountName,
                accountNumber,
                bankName,
                bsbNumber,
                amount,
                currency: currency.toUpperCase(),
            };
            const r = authentication_1.createHmac(`${this.apiPrefix}/withdrawEFT`, this.publicKey, this.privateKey, null, body);
            return this.common.request('POST', r.path, null, body, r.headers);
        });
    }
    history(limit, since, indexForward) {
        const qs = {
            limit: limit ? (limit > 200 ? 200 : limit) : null,
            since,
            indexForward,
        };
        const r = authentication_1.createHmac(`${this.apiPrefix}/history`, this.publicKey, this.privateKey, qs);
        return this.common.request('GET', r.path, qs, null, r.headers);
    }
}
exports.FundTransfer = FundTransfer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZFRyYW5zZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Z1bmRUcmFuc2Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUNBQWtDO0FBQ2xDLDhEQUF1RDtBQUl2RDtJQU9FLFlBQ0UsU0FBa0IsRUFDbEIsVUFBbUI7UUFFbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFFN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7UUFFakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFWSxjQUFjLENBQUMsTUFBYyxFQUFFLE9BQWUsRUFBRSxRQUFnQjs7WUFDM0UsTUFBTSxJQUFJLEdBQUc7Z0JBQ1gsTUFBTTtnQkFDTixPQUFPO2dCQUNQLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFO2FBQ2pDLENBQUM7WUFFRixNQUFNLENBQUMsR0FBRywyQkFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV0RyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FBQTtJQUVZLFdBQVcsQ0FDdEIsV0FBbUIsRUFDbkIsYUFBcUIsRUFDckIsUUFBZ0IsRUFDaEIsU0FBaUIsRUFDakIsTUFBYyxFQUNkLFFBQWdCOztZQUVoQixNQUFNLElBQUksR0FBRztnQkFDWCxXQUFXO2dCQUNYLGFBQWE7Z0JBQ2IsUUFBUTtnQkFDUixTQUFTO2dCQUNULE1BQU07Z0JBQ04sUUFBUSxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUU7YUFDakMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxHQUFHLDJCQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVuRyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FBQTtJQUVNLE9BQU8sQ0FBQyxLQUFjLEVBQUUsS0FBYyxFQUFFLFlBQXNCO1FBQ25FLE1BQU0sRUFBRSxHQUFHO1lBQ1QsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ2pELEtBQUs7WUFDTCxZQUFZO1NBQ2IsQ0FBQztRQUVGLE1BQU0sQ0FBQyxHQUFHLDJCQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNGO0FBaEVELG9DQWdFQyJ9