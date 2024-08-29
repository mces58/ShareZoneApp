import React from 'react';

import styled from 'styled-components/native';

interface CardProps {
  description: string;
  imageUrl: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <Container>
      <Image source={{ uri: imageUrl }} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Container>
  );
};

export default Card;

const Container = styled.View({
  width: '80%',
  borderRadius: 8,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 5,
  marginBottom: 20,
});

const Image = styled.Image({
  width: '100%',
  height: 150,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  resizeMode: 'stretch',
});

const Content = styled.View({
  padding: 15,
});

const Title = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
});

const Description = styled.Text({
  fontSize: 14,
  color: '#666',
});
