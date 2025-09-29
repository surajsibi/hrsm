import type { FC, ReactNode } from 'react';

interface OmitRTLProps {
  children: ReactNode;
  omitRTL?: boolean;
}

const OmitRTL: FC<OmitRTLProps> = ({ children, omitRTL = true }) => {
  const dir = omitRTL ? 'ltr' : 'inherit';

  return <div style={{ direction: dir, unicodeBidi: 'isolate' }}>{children}</div>;
};

export default OmitRTL;
