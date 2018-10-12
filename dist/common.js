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
const rp = require("request-promise");
class Common {
    constructor() {
        const domain = 'api.btcmarkets.net';
        this.uri = `https://${domain}`;
        this.accountFloat = 100000000;
    }
    request(method, path, qs, body, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = {
                uri: `${this.uri}${path}`,
                json: true,
                body: this.buildParams(body),
                headers,
                method,
                qs: this.buildParams(qs),
            };
            return rp(opts);
        });
    }
    adjustBalance(item, figures) {
        figures.forEach(figure => {
            if (item[figure] > 0) {
                item[figure] = this.convertFigure(false, item[figure]);
            }
        });
        return item;
    }
    convertFigure(sendFigure, figure) {
        return sendFigure ? figure * this.accountFloat : figure / this.accountFloat;
    }
    buildParams(params) {
        const returnParams = {};
        let length = 0;
        if (params) {
            Object.keys(params)
                .forEach(key => {
                if (params[key]) {
                    returnParams[key] = params[key];
                    length++;
                }
            });
        }
        return length > 0 ? returnParams : null;
    }
}
exports.Common = Common;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBR3RDO0lBSUU7UUFDRSxNQUFNLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsTUFBTSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVZLE9BQU8sQ0FBQyxNQUFjLEVBQUUsSUFBWSxFQUFFLEVBQVcsRUFBRSxJQUFhLEVBQUUsT0FBcUI7O1lBQ2xHLE1BQU0sSUFBSSxHQUFHO2dCQUNYLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFO2dCQUN6QixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLE9BQU87Z0JBQ1AsTUFBTTtnQkFDTixFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDekIsQ0FBQztZQUVGLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVNLGFBQWEsQ0FBQyxJQUFTLEVBQUUsT0FBaUI7UUFDL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQW1CLEVBQUUsTUFBYztRQUN0RCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzlFLENBQUM7SUFFTyxXQUFXLENBQUMsTUFBVztRQUM3QixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWYsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNmLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sRUFBRSxDQUFDO2lCQUNWO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBckRELHdCQXFEQyJ9