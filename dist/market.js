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
        return __awaiter(this, void 0, void 0, function* () {
            return this.common.request('GET', `/v2${this.apiPrefix}/active`);
        });
    }
    tick(instrument, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.common.request('GET', `${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/tick`);
        });
    }
    orderbook(instrument, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.common.request('GET', `${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/orderbook`);
        });
    }
    trades(instrument, currency, limit, since, indexForward) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = {
                indexForward,
                limit,
                since,
            };
            const response = yield this.common.request('GET', `/v2${this.apiPrefix}/${instrument.toUpperCase()}/${currency.toUpperCase()}/trades`, qs);
            response.trades = response.trades.map(t => this.common.adjustBalance(t, ['price', 'volume']));
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
        });
    }
}
exports.Market = Market;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcmtldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUNBQWtDO0FBUWxDO0lBSUU7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVZLE1BQU07O1lBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLFNBQVMsU0FBUyxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0lBRVksSUFBSSxDQUFDLFVBQWtCLEVBQUUsUUFBZ0I7O1lBQ3BELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwSCxDQUFDO0tBQUE7SUFFWSxTQUFTLENBQUMsVUFBa0IsRUFBRSxRQUFnQjs7WUFDekQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pILENBQUM7S0FBQTtJQUVZLE1BQU0sQ0FBQyxVQUFrQixFQUFFLFFBQWdCLEVBQUUsS0FBYyxFQUFFLEtBQWMsRUFBRSxZQUFzQjs7WUFDOUcsTUFBTSxFQUFFLEdBQUc7Z0JBQ1QsWUFBWTtnQkFDWixLQUFLO2dCQUNMLEtBQUs7YUFDTixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDeEMsS0FBSyxFQUNMLE1BQU0sSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQ25GLEVBQUUsQ0FDSCxDQUFDO1lBRUYsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUYsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNuQixNQUFNLFVBQVUsR0FBRztvQkFDakIsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsWUFBWSxFQUFFLFNBQVM7aUJBQ3hCLENBQUM7Z0JBRUYsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ3hFO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRVksYUFBYSxDQUN4QixVQUFrQixFQUNsQixRQUFnQixFQUNoQixJQUEyQixFQUMzQixLQUFjLEVBQ2QsS0FBYyxFQUNkLFlBQXNCLEVBQ3RCLFdBQXFCOztZQUVyQixNQUFNLEVBQUUsR0FBRztnQkFDVCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWixXQUFXO2FBQ1osQ0FBQztZQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ3hDLEtBQUssRUFDTCxNQUFNLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsZUFBZSxJQUFJLEVBQUUsRUFDL0YsRUFBRSxDQUNILENBQUM7WUFFRixRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuSCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7Q0FDRjtBQTVFRCx3QkE0RUMifQ==