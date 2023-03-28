import React from 'react';

import ServerStyle from '@site/src/components/ServerStyle/ServerStyle';

function Root({children}) {
  return (
    <>
      <ServerStyle from={children} />
      {children}
    </>
  );
}

export default Root;
