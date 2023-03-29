import React from 'react';
import {MoonLoader as Loader} from 'react-spinners';
import {LoadingWrapper} from '@site/src/components/Loading/styledComponents';

const MoonLoader = () => {
  return (
    <LoadingWrapper>
      <Loader color="var(--ifm-color-primary)" size={50} />
    </LoadingWrapper>
  );
};

export default MoonLoader;
