import React from 'react';
import {
  FileContainer,
  FileItem,
} from '@site/src/components/IntegrationBuilder/FileList/styledComponents';

const FileList = props => {
  const {options, value, onChange} = props;

  return (
    <FileContainer>
      {options.map(option => (
        <FileItem
          key={option}
          isActive={value === option}
          onClick={() => onChange(option)}
        >
          {option.slice(option.lastIndexOf('/') + 1)}
        </FileItem>
      ))}
    </FileContainer>
  );
};

export default FileList;
