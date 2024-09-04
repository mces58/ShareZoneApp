import React from 'react';

import styled from 'styled-components/native';

interface RowProps {
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

const Row: React.FC<RowProps> = ({
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
    <RowContainer
      alignItems={alignItems}
      backgroundColor={backgroundColor}
      flex={flex}
      gap={gap}
      justifyContent={justifyContent}
      padding={padding}
      width={width}
    >
      {children}
    </RowContainer>
  );
};

export default Row;

const RowContainer = styled.View<RowProps>(
  ({ alignItems, backgroundColor, flex, gap, justifyContent, padding, width }) => ({
    alignItems: alignItems || 'flex-start',
    backgroundColor: backgroundColor || 'transparent',
    flexDirection: 'row',
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
