import React from 'react';
import {SyncLoader as Loader} from 'react-spinners';
import {LoadingWrapper} from '@site/src/components/Loading/styledComponents';

const SyncLoader = () => {
  return (
    <LoadingWrapper>
      <Loader color="#4f46e5" size={20} />
    </LoadingWrapper>
  );
};

export default SyncLoader;
