"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const querystring = require("querystring");
function createHmac(path, publicApiKey, privateApiKey, qs, body) {
    qs = buildParams(qs);
    const nonce = new Date().valueOf();
    const message = [
        path,
    ];
    if (path.match(/^\/v2\//)) {
        // v2 Authentication
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBaUM7QUFDakMsMkNBQTJDO0FBSTNDLG9CQUNFLElBQVksRUFDWixZQUFvQixFQUNwQixhQUFxQixFQUNyQixFQUFXLEVBQ1gsSUFBYTtJQUViLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFckIsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUVuQyxNQUFNLE9BQU8sR0FBVTtRQUNyQixJQUFJO0tBQ0wsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN6QixvQkFBb0I7UUFDcEIsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7SUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXBCLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRWhELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekIsZUFBZSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7SUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0UsTUFBTSxDQUFDLGVBQWUsQ0FBQztTQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFdEIsT0FBTztRQUNMLE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVM7U0FDVjtRQUNELElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQztBQUNKLENBQUM7QUFoREQsZ0NBZ0RDO0FBRUQscUJBQXFCLE1BQVc7SUFDOUIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBRXhCLElBQUksTUFBTSxFQUFFO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2YsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQztRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIn0=