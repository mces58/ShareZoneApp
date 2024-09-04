import React from 'react';

import SpacemanLogo from '../../assets/spaceman.svg';
import ReactIcon from 'src/assets/icons/react';
import GradientButton from 'src/components/buttons/Gradient.button';
import BaseContainer from 'src/components/containers/Base.container';
import Container from 'src/components/containers/Container.container';
import Row from 'src/components/containers/Row.container';
import BaseText from 'src/components/texts/Base.text';
import GradientText from 'src/components/texts/Gradient.text';
import { COLORS } from 'src/constants/styles/colors';
import { FONTS } from 'src/constants/styles/fonts';
import { scaleFontSize } from 'src/utils/dimensions';

const Welcome = (): JSX.Element => {
  return (
    <BaseContainer>
      <Container alignItems="center">
        <Container flex={2.8} padding={{ top: 30 }} alignItems="center">
          <SpacemanLogo width={280} height={280} />
        </Container>
        <Container alignItems="center" gap={5}>
          <Row gap={5} alignItems="center" justifyContent="center">
            <ReactIcon
              colors={[COLORS.GREEN._400, COLORS.SKY._400, COLORS.VIOLET._500]}
              height={50}
              width={50}
            />
            <GradientText
              text="ShareZone!"
              colors={[COLORS.INDIGO._500, COLORS.ORANGE._400, COLORS.RED._500]}
              style={{
                fontSize: scaleFontSize(55),
                textDecorationLine: 'underline',
              }}
            />
          </Row>
          <BaseText
            text="Where ideas ignite and visuals create unforgettable moments."
            style={{ fontSize: scaleFontSize(18), fontFamily: FONTS.Nunito.Bold }}
            textAlign="center"
            padding={{ left: 20, right: 20 }}
          />
        </Container>
        <Container alignItems="center" justifyContent="flex-end">
          <GradientButton
            title="Get Started"
            colors={[COLORS.INDIGO._500, COLORS.ORANGE._400, COLORS.RED._500]}
            onPress={() => console.log('Get Started')}
            style={{ width: '60%' }}
          />
        </Container>
        <Row
          gap={5}
          alignItems="flex-end"
          justifyContent="center"
          padding={{ bottom: 30 }}
        >
          <BaseText text="Already have an account?" />
          <GradientText
            text="Sign In"
            colors={[COLORS.INDIGO._500, COLORS.ORANGE._400, COLORS.RED._500]}
            style={{ textDecorationLine: 'underline' }}
            padding={{ bottom: 1 }}
          />
        </Row>
      </Container>
    </BaseContainer>
  );
};

export default Welcome;
