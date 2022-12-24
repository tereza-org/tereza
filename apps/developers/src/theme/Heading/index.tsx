import * as React from 'react';
// import { BaseStyles } from 'theme-ui';
import Heading from '@theme-original/Heading';
import type { WrapperProps } from '@docusaurus/types';
import type HeadingType from '@theme/Heading';

type Props = WrapperProps<typeof HeadingType>;

const WrappedHeading = (props: Props) => {
  return (
    // <BaseStyles>
    <Heading {...props} />
    // </BaseStyles>
  );
};

export default WrappedHeading;
