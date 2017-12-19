import { NetworkRequest } from './network';

// cli generated code
export class Transport {
    static execute: (id:string, params:object) => Promise<any>  = (id, params) => {
        let request: NetworkRequest;
        switch(id) {
            case 'SendReceipt':
             request = <NetworkRequest>{
                send: (params) => {
                    return Promise.resolve();
                }
            };
            return request.send(params);

            default:
            request = <NetworkRequest> {
                send: (params) => {
                    return Promise.resolve();
                }
            }
            return request.send(params);
        }
    }
}