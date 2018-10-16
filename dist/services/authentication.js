"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const querystring = require("querystring");
function createHmac(path, publicApiKey, privateApiKey, qs, body, v2) {
    qs = buildParams(qs);
    const nonce = new Date().valueOf();
    const message = [
        path,
    ];
    if (v2) { // v2 Authentication
        const stringQs = querystring.stringify(qs);
        if (Object.keys(qs).length > 0) {
            message.push(stringQs);
        }
    }
    message.push(nonce);
    let signatureParams = message.join('\n') + '\n';
    const stringBody = JSON.stringify(body);
    if (body && Object.keys(body).length > 0) {
        message.push(stringBody);
        signatureParams = message.join('\n');
    }
    const signature = crypto.createHmac('sha512', new Buffer(privateApiKey, 'base64'))
        .update(signatureParams)
        .digest('base64');
    return {
        headers: {
            apiKey: publicApiKey,
            timestamp: nonce,
            signature,
        },
        path: path,
    };
}
exports.createHmac = createHmac;
function buildParams(params) {
    const returnParams = {};
    if (params) {
        Object.keys(params)
            .forEach(key => {
            if (params[key]) {
                returnParams[key] = params[key];
            }
        });
    }
    return returnParams;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBaUM7QUFDakMsMkNBQTJDO0FBSTNDLG9CQUNFLElBQVksRUFDWixZQUFvQixFQUNwQixhQUFxQixFQUNyQixFQUFXLEVBQ1gsSUFBYSxFQUNiLEVBQVk7SUFFWixFQUFFLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXJCLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFbkMsTUFBTSxPQUFPLEdBQVU7UUFDckIsSUFBSTtLQUNMLENBQUM7SUFFRixJQUFJLEVBQUUsRUFBRSxFQUFFLG9CQUFvQjtRQUM1QixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDeEI7S0FDRjtJQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEIsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFaEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV6QixlQUFlLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QztJQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3RSxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV0QixPQUFPO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsTUFBTSxFQUFFLFlBQVk7WUFDcEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUztTQUNWO1FBQ0QsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDO0FBQ0osQ0FBQztBQWhERCxnQ0FnREM7QUFFRCxxQkFBcUIsTUFBVztJQUM5QixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7SUFFeEIsSUFBSSxNQUFNLEVBQUU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDZixZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMifQ==