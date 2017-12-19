export interface NetworkRequest {
    send(params:object): Promise<any>;
}