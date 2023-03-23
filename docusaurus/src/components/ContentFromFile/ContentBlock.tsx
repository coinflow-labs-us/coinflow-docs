import React, {
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import {ContentBlockContainer} from './styledComponents';
import {ContentBlockContext} from '@site/src/context/ContentBlockContext/ContentBlockContext';
import {v4 as uuidv4} from 'uuid';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  filePath?: string;
  highlight?: string;
}

const ContentBlock: FC<IProps> = props => {
  const {setFilePath, setHighlight, activeId, setActiveId} =
    useContext(ContentBlockContext);
  const [id, setId] = useState();

  useEffect(() => {
    setId(uuidv4());
  }, []);

  return (
    <ContentBlockContainer
      onClick={() => {
        if (props.filePath) {
          setFilePath(props.filePath);

          if (props.highlight) setHighlight(props.highlight);
        }

        setActiveId(id);
      }}
      isActive={activeId === id}
    >
      {props.children}
    </ContentBlockContainer>
  );
};

export default ContentBlock;
