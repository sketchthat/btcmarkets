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
class Transaction {
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        const apiVersion = '/v2';
        const apiGroup = '/transaction';
        this.apiPrefix = `${apiVersion}${apiGroup}`;
        this.common = new common_1.Common();
    }
    history(currency, since, indexForward, sortForward) {
        return __awaiter(this, void 0, void 0, function* () {
            let path = `${this.apiPrefix}/history`;
            if (currency) {
                path = `${path}/${currency.toUpperCase()}`;
            }
            const qs = {
                since,
                indexForward,
                sortForward,
            };
            const r = authentication_1.createHmac(path, this.publicKey, this.privateKey, qs);
            const response = yield this.common.request('GET', r.path, qs, null, r.headers);
            response.transactions = response.transactions.map(t => this.common.adjustBalance(t, ['balance', 'amount']));
            return response;
        });
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHJhbnNhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFDQUFrQztBQUNsQyw4REFBdUQ7QUFJdkQ7SUFPRSxZQUNFLFNBQWtCLEVBQ2xCLFVBQW1CO1FBRW5CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBRTdCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUU1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVZLE9BQU8sQ0FBQyxRQUFpQixFQUFFLEtBQWMsRUFBRSxZQUFzQixFQUFFLFdBQXFCOztZQUNuRyxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLFVBQVUsQ0FBQztZQUV2QyxJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7YUFDNUM7WUFFRCxNQUFNLEVBQUUsR0FBRztnQkFDVCxLQUFLO2dCQUNMLFlBQVk7Z0JBQ1osV0FBVzthQUNaLENBQUM7WUFFRixNQUFNLENBQUMsR0FBRywyQkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvRSxRQUFRLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1RyxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7Q0FDRjtBQTFDRCxrQ0EwQ0MifQ==