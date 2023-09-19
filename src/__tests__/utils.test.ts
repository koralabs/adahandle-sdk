import { isHex } from '../utils/hex';

describe('isHex', () => {
    it('should correctly test hex and non-hex strings', () => {
        expect(isHex(Buffer.from('testing').toString('hex'))).toBeTruthy();
        expect(isHex('edca3d6a16195194ab8a950fea908f5d10421da0a4dabb6d687182f7460c0412')).toBeTruthy();
        expect(isHex('e1ea0b199ab23024d9db9ce892cd925ac11ae7eddfe1a8ad13f0e13c89')).toBeTruthy();
        expect(
            isHex(
                '014bda083192a442034f307e2f63927aefb514500baa51c332b6974fb4ea0b199ab23024d9db9ce892cd925ac11ae7eddfe1a8ad13f0e13c89'
            )
        ).toBeTruthy();

        expect(isHex(Buffer.from('invalid hex encoding', 'hex').toString('hex'))).toBeFalsy();
        expect(isHex('#123')).toBeFalsy();
        expect(isHex('myname')).toBeFalsy();
        expect(
            isHex(
                'addr1q99a5zp3j2jyyq60xplz7cuj0thm29zspw49rsejk6t5ld82pvve4v3synvah88gjtxeykkprtn7mhlp4zk38u8p8jystp9rw9'
            )
        ).toBeFalsy();
    });
});
