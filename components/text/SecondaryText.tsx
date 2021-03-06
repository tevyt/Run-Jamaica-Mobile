import React from 'react';

import {textSecondary} from '../../constants/colors';

import CustomText, {CustomTextProps} from './CustomText';

function SecondaryText(
  props: React.PropsWithChildren<CustomTextProps>,
): JSX.Element {
  return <CustomText color={textSecondary} {...props} />;
}

export default SecondaryText;
