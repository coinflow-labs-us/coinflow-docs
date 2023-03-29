import ContentNotFound from './ContentNotFound';
import {RetryButton} from './styledComponents';
import React from 'react';
import MoonLoader from '../Loading/MoonLoader';

const Loading = props => {
  if (props.error) {
    if (props.error.code === 'MODULE_NOT_FOUND') {
      return <ContentNotFound />;
    }

    return (
      <>
        <h2>Error!</h2>
        <RetryButton className="errorRetry" onClick={props.retry}>
          Retry
        </RetryButton>
      </>
    );
  } else if (props.timedOut) {
    return (
      <>
        <h2>Taking a long time...</h2>
        <RetryButton onClick={props.retry}>Retry</RetryButton>
      </>
    );
  } else if (props.pastDelay) {
    return <MoonLoader />;
  } else {
    return null;
  }
};

export default Loading;
