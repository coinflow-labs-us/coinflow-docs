import React, {FC, HTMLAttributes, useContext} from 'react';
import {ContentBlockContainer} from './styledComponents';
import {ContentBlockContext} from '@site/src/context/ContentBlockContext/ContentBlockContext';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  filePath?: string;
  highlight?: string;
}

const ContentBlock: FC<IProps> = props => {
  const {setFilePath, setHighlight} = useContext(ContentBlockContext);

  return (
    <ContentBlockContainer
      onClick={() => {
        if (props.filePath) {
          setFilePath(props.filePath);

          if (props.highlight) setHighlight(props.highlight);
        }
      }}
    >
      {props.children}
    </ContentBlockContainer>
  );
};

export default ContentBlock;
