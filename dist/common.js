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
const querystring = require("querystring");
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
            const response = yield rp(opts);
            if (response && response.paging) {
                const newer = this.getPaging(response.paging.newer);
                const older = this.getPaging(response.paging.older);
                response.paging = {
                    newer,
                    older,
                };
            }
            return response;
        });
    }
    adjustBalance(item, figures) {
        figures.forEach(figure => {
            if (item[figure] !== 0) {
                item[figure] = this.convertFigure(false, item[figure]);
            }
        });
        return item;
    }
    convertFigure(sendFigure, figure) {
        return sendFigure ? figure * this.accountFloat : figure / this.accountFloat;
    }
    convertType(paging, adjustment) {
        const adjustTool = ((key, direction) => {
            if (adjustment[key]) {
                const value = paging[direction][key];
                switch (adjustment[key]) {
                    case 'number':
                        converted[direction][key] = parseInt(value, 10);
                        break;
                    case 'boolean':
                        converted[direction][key] = value === 'true';
                        break;
                    default:
                        converted[direction][key] = value;
                        break;
                }
            }
        });
        const converted = {
            newer: {},
            older: {},
        };
        if (paging) {
            Object.keys(paging).forEach(direction => {
                if (paging[direction]) {
                    Object.keys(paging[direction]).forEach(key => {
                        adjustTool(key, direction);
                    });
                }
            });
        }
        return converted;
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
    getPaging(paging) {
        let qs = {};
        if (paging && paging.match(/\?/)) {
            const split = paging.split('?');
            qs = querystring.parse(split[1]);
        }
        return qs;
    }
}
exports.Common = Common;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQTJDO0FBQzNDLHNDQUFzQztBQUl0QztJQUlFO1FBQ0UsTUFBTSxNQUFNLEdBQUcsb0JBQW9CLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLE1BQU0sRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFWSxPQUFPLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxFQUFXLEVBQUUsSUFBYSxFQUFFLE9BQXFCOztZQUNsRyxNQUFNLElBQUksR0FBRztnQkFDWCxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRTtnQkFDekIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUM1QixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO2FBQ3pCLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVoQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFcEQsUUFBUSxDQUFDLE1BQU0sR0FBRztvQkFDaEIsS0FBSztvQkFDTCxLQUFLO2lCQUNOLENBQUM7YUFDSDtZQUVELE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7S0FB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