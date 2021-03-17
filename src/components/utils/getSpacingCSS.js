const getSpacingCSS = ({ for: spacingKey, using: spacingObj }) => {
  let spacerString = '';

  if (spacingObj) {
    if (spacingObj.all) {
      spacerString = `${spacingKey}: var(--spacing-${spacingObj.all});`;
    } else if (spacingObj.vertical && !spacingObj.horizontal) {
      spacerString = `${spacingKey}: var(--spacing-${spacingObj.vertical}) 0;`;
    } else if (spacingObj.horizontal && !spacingObj.vertical) {
      spacerString = `${spacingKey}: 0 var(--spacing-${spacingObj.horizontal});`;
    } else if (spacingObj.horizontal && spacingObj.vertical) {
      spacerString = `${spacingKey}: var(--spacing-${spacingObj.vertical}) var(--spacing-${spacingObj.horizontal});`;
    } else {
      const singleSpacers = ['top', 'right', 'bottom', 'left'];
      const spacingItems = [];

      singleSpacers.forEach((singleSpacer) => {
        const spaceValue = spacingObj[singleSpacer];
        if (spaceValue) {
          spacingItems.push(`var(--spacing-${spaceValue})`);
        } else {
          spacingItems.push('0');
        }
      });

      if (spacingItems.some((spacingItem) => spacingItem !== '0')) {
        spacerString = `${spacingKey}: ${spacingItems.join(' ')};`;
      }
    }
  }

  return spacerString;
};

export default getSpacingCSS;
