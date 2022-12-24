import * as React from 'react';
// import { BaseStyles } from '@ttoss/ui';
import MDXContent from '@theme-original/MDXContent';
import type { WrapperProps } from '@docusaurus/types';
import type MDXContentType from '@theme/MDXContent';

type Props = WrapperProps<typeof MDXContentType>;

const WrappedMDXContent = (props: Props) => {
  return (
    // <BaseStyles>
    <MDXContent {...props} />
    // </BaseStyles>
  );
};

export default WrappedMDXContent;
