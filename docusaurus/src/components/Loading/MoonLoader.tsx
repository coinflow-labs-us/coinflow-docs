import React from 'react';
import {MoonLoader as Loader} from 'react-spinners';
import {LoadingWrapper} from '@site/src/components/Loading/styledComponents';

const MoonLoader = () => {
  return (
    <LoadingWrapper>
      <Loader color="#4f46e5" size={50} />
    </LoadingWrapper>
  );
};

export default MoonLoader;
