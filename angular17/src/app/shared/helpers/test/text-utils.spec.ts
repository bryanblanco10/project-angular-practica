import { normalizeText } from '../text-utils.helper';

describe('Text Utils', () => {

    describe('normalizeText', () => {

        it('should normalize and remove diacritics, spaces and convert to lowercase', () => {
            const input = "Él caminó rápidamente";
            const result = normalizeText(input);
            expect(result).toBe("elcaminorapidamente");
        });

    });

});
