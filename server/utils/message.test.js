const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);
        // assert from match
        // assert text match
        expect(message).toInclude({from, text});
        // assert createdAt is number
        expect(message.createdAt).toBeA('number');
    });
});