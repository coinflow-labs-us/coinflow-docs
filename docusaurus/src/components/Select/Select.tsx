import React from 'react';
import {default as BaseSelect} from 'react-select';
import {useColorMode} from '@docusaurus/theme-common';

const Select = props => {
  const {colorMode} = useColorMode();
  const styles =
    colorMode === 'dark'
      ? {
          control: styles => ({
            ...styles,
            backgroundColor: '#333333',
          }),
          option: (styles, props) => ({
            ...styles,
            backgroundColor: props.isSelected ? '#2684ff' : '#333333',
            ':hover': {
              backgroundColor: '#555555',
            },
          }),
          singleValue: styles => ({
            ...styles,
            color: 'white',
          }),
          menu: styles => ({
            ...styles,
            backgroundColor: '#333333',
          }),
        }
      : undefined;

  return <BaseSelect {...props} styles={styles} />;
};

export default Select;
