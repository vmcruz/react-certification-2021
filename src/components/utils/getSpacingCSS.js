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
      spacerString = `${spacingKey}: var(--spacing-${
        spacingObj.top || 'default'
      }) var(--spacing-${spacingObj.right || 'default'}) var(--spacing-${
        spacingObj.bottom || 'default'
      }) var(--spacing-${spacingObj.left || 'default'});`;
    }
  }

  return spacerString;
};

export default getSpacingCSS;
