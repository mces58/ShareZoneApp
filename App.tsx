import { StatusBar } from "expo-status-bar";
import Button from "src/components/Button";
import styled from "styled-components/native";
import React from "react";
import { SafeAreaView } from "react-native";

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <Container>
        <Button />
        <StatusBar style="auto" />
      </Container>
    </SafeAreaView>
  );
};

export default App;

const Container = styled.View({
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
});
