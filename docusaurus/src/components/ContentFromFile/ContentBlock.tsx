import React, {
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import {ContentBlockContainer, SourceLink} from './styledComponents';
import ContentBlockContext from '@site/src/context/ContentBlockContext';
import {v4 as uuidv4} from 'uuid';
import GitHubIcon from '@site/src/components/Icons/GitHubIcon';
import {GITHUB_EXAMPLES_LINK} from '@site/src/utils/constants';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  filePath?: string;
  highlight?: string;
}

const ContentBlock: FC<IProps> = props => {
  const {
    setActiveBlockFile,
    setHighlight,
    activeBlock,
    setActiveBlock,
    languageValue,
    chainValue,
    productValue,
    highlight,
  } = useContext(ContentBlockContext);
  const [id, setId] = useState();

  useEffect(() => {
    setId(uuidv4());
  }, []);

  const highlightParam = highlight ? '#L' + parseInt(highlight) : '';

  return (
    <ContentBlockContainer
      onClick={() => {
        setHighlight(undefined);

        if (props.filePath) {
          setActiveBlockFile(props.filePath);

          if (props.highlight) setHighlight(props.highlight);
        }

        setActiveBlock({
          id,
          filePath: props.filePath,
          highlight: props.highlight,
        });
      }}
      isActive={activeBlock?.id === id}
    >
      <div>{props.children}</div>
      {!!props.filePath && (
        <div className="source-link-container">
          <SourceLink
            href={`${GITHUB_EXAMPLES_LINK}${languageValue}/${chainValue}/${productValue}/${props.filePath}${highlightParam}`}
            target="_blank"
          >
            <span>Source</span>
            <GitHubIcon />
          </SourceLink>
        </div>
      )}
    </ContentBlockContainer>
  );
};

export default ContentBlock;
