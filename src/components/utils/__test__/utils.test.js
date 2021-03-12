import utils from 'components/utils';

describe('utils', () => {
  describe('getSpacingCSS', () => {
    it('should return empty string when the using obj is not present', () => {
      let result = utils.getSpacingCSS({ for: 'margin', using: null });
      expect(result).toEqual('');

      result = utils.getSpacingCSS({ for: 'margin', using: undefined });
      expect(result).toEqual('');

      result = utils.getSpacingCSS({ for: 'margin' });
      expect(result).toEqual('');
    });

    it('should accept any spacing key', () => {
      let result = utils.getSpacingCSS({ for: 'margin', using: { all: 'sm' } });
      expect(result).toEqual('margin: var(--spacing-sm);');

      result = utils.getSpacingCSS({ for: 'justTesting', using: { all: 'sm' } });
      expect(result).toEqual('justTesting: var(--spacing-sm);');
    });

    it('should return the correct spacing for vertical option', () => {
      const result = utils.getSpacingCSS({ for: 'margin', using: { vertical: 'sm' } });
      expect(result).toEqual('margin: var(--spacing-sm) 0;');
    });

    it('should return the correct spacing for horizontal option', () => {
      const result = utils.getSpacingCSS({ for: 'padding', using: { horizontal: 'sm' } });
      expect(result).toEqual('padding: 0 var(--spacing-sm);');
    });

    it('should return the correct spacing for vertical and horizontal option', () => {
      const result = utils.getSpacingCSS({
        for: 'padding',
        using: { horizontal: 'sm', vertical: 'lg' },
      });
      expect(result).toEqual('padding: var(--spacing-lg) var(--spacing-sm);');
    });

    it('should return the empty spacing for invalid options', () => {
      const result = utils.getSpacingCSS({
        for: 'padding',
        using: { invalid: 'option' },
      });
      expect(result).toEqual('');
    });

    it('should return the correct spacing for each side options', () => {
      const result = utils.getSpacingCSS({
        for: 'padding',
        using: { top: 'sm', right: 'md', bottom: 'lg', left: 'xlg' },
      });
      expect(result).toEqual(
        'padding: var(--spacing-sm) var(--spacing-md) var(--spacing-lg) var(--spacing-xlg);'
      );
    });
  });
});
