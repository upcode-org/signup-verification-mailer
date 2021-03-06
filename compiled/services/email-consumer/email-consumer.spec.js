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
const chai_1 = require("chai");
require("mocha");
const composition_root_1 = require("../../composition-root");
describe('Verification Mailer Test:', function () {
    this.timeout(20000);
    let container;
    before(() => __awaiter(this, void 0, void 0, function* () {
        container = yield composition_root_1.containerResolver();
    }));
    it('should send a verification email', () => __awaiter(this, void 0, void 0, function* () {
        const emailConsumer = container.get('emailConsumer');
        const emailMsg = {
            msgTypeId: 1,
            recipientEmail: 'svegalopez@gmail.com',
            processInstanceId: (process.pid).toString(),
            payload: {
                "APP_IDENTITY_PROVIDER_HOST": 'test-host',
                "FIRST_NAME": 'Test Name',
                "LAST_NAME": 'Test Surname',
                "USER_ID": '123456',
            }
        };
        const msg = { content: new Buffer(JSON.stringify(emailMsg)) };
        let result;
        try {
            result = yield emailConsumer.onMessage(msg);
        }
        catch (err) {
            result = err;
        }
        chai_1.expect(result).to.satisfy((result) => {
            console.log('RESULT: ', result);
            if (result && result.substring(0, 3) === '250')
                return true;
            return false;
        });
    }));
    after(() => {
        const emailConsumer = container.get('emailConsumer');
        emailConsumer.transporter.close();
    });
});
//# sourceMappingURL=email-consumer.spec.js.map