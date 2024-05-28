import { redirectToMobile } from '../mobile-utils.helper';

describe('Mobile Utils', () => {

    describe('redirectToMobile', () => {

        it('should redirect to the URL passed', () => {
           
            const originalLocationHref = window.location.href;
            Object.defineProperty(window, 'location', {
              value: {
                href: '',
              },
              writable: true,
            });
        
            const url = 'https://example.com/mobile';
        
            redirectToMobile(url);
        
            expect(window.location.href).toBe(url);
        
            window.location.href = originalLocationHref;
          });

    });

});
