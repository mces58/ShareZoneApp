import React from 'react';

import styled from 'styled-components/native';

interface ContainerProps {
  children: React.ReactNode;
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  backgroundColor?: string;
  flex?: number;
  gap?: number;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  padding?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  width?: number | string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  alignItems,
  backgroundColor,
  flex,
  gap,
  justifyContent,
  padding,
  width,
}) => {
  return (
    <StyledContainer
      alignItems={alignItems}
      backgroundColor={backgroundColor}
      flex={flex}
      gap={gap}
      justifyContent={justifyContent}
      padding={padding}
      width={width}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;

const StyledContainer = styled.View<ContainerProps>(
  ({ alignItems, backgroundColor, flex, gap, justifyContent, padding, width }) => ({
    alignItems: alignItems || 'flex-start',
    backgroundColor: backgroundColor || 'transparent',
    flex: flex || 1,
    gap: gap || 0,
    justifyContent: justifyContent || 'flex-start',
    paddingBottom: padding?.bottom || 0,
    paddingLeft: padding?.left || 0,
    paddingRight: padding?.right || 0,
    paddingTop: padding?.top || 0,
    width: width || '100%',
  })
);
