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
class Market {
    constructor() {
        this.common = new common_1.Common();
        this.apiPrefix = '/market';
    }
    active() {
        return this.common.request('GET', `/v2${this.apiPrefix}/active`);
    }
    tick(instrument, currency) {
        return this.common.request('GET', `${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/tick`);
    }
    orderbook(instrument, currency) {
        return this.common.request('GET', `${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/orderbook`);
    }
    trades(instrument, currency, indexForward, limit, since) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                indexForward,
                limit,
                since,
            };
            const response = yield this.common.request('GET', `/v2${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/trades`, qs);
            response.trades = response.trades.map(o => this.common.adjustBalance(o, ['price', 'volume']));
            return response;
        });
    }
    historicTicks(instrument, currency, time, limit, since, indexForward, sortForward) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                limit,
                since,
                indexForward,
                sortForward,
            };
            const response = yield this.common.request('GET', `/v2${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/tickByTime/${time}`, qs);
            response.ticks = response.ticks.map(t => this.common.adjustBalance(t, ['open', 'high', 'low', 'close', 'volume']));
            return response;
            // /v2/market/{instrument}/{currency}/tickByTime/{[minute | hour | day]}
        });
    }
}
exports.Market = Market;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcmtldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUNBQWtDO0FBUWxDO0lBSUU7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxTQUFTLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSxJQUFJLENBQUMsVUFBa0IsRUFBRSxRQUFnQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVNLFNBQVMsQ0FBQyxVQUFrQixFQUFFLFFBQWdCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN6SCxDQUFDO0lBRVksTUFBTSxDQUFDLFVBQWtCLEVBQUUsUUFBZ0IsRUFBRSxZQUFzQixFQUFFLEtBQWMsRUFBRSxLQUFjOztZQUM5RyxNQUFNLEVBQUUsR0FBRztnQkFDVCxZQUFZO2dCQUNaLEtBQUs7Z0JBQ0wsS0FBSzthQUNOLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTNJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlGLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVZLGFBQWEsQ0FBQyxVQUFrQixFQUFFLFFBQWdCLEVBQUUsSUFBMkIsRUFBRSxLQUFjLEVBQUUsS0FBYyxFQUFFLFlBQXNCLEVBQUUsV0FBcUI7O1lBQ3pLLE1BQU0sRUFBRSxHQUFHO2dCQUNULEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxZQUFZO2dCQUNaLFdBQVc7YUFDWixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLGVBQWUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdkosUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkgsT0FBTyxRQUFRLENBQUM7WUFDaEIsd0VBQXdFO1FBQzFFLENBQUM7S0FBQTtDQUNGO0FBbkRELHdCQW1EQyJ9