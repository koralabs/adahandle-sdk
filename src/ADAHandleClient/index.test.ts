import { ADAHandleClient } from '.';

describe('ADAHandleClient tests', () => {
    it('should init properly', () => {
        const client = new ADAHandleClient();
        expect(client).toHaveProperty('init');
    });

    it('should have the correct policy Id', () => {
        const client = new ADAHandleClient();
        expect(client.policyIds).toEqual('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a');
    });
});
