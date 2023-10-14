import { useLoaderData } from "react-router-dom";
import { Header, Main, Footer, Section } from "@alpe88/adar";

function App() {
  const data = useLoaderData();
  console.log({ data });
  return (
    <>
      <Header>Header</Header>
      <Main>
        <Section id="about"></Section>
        <Section id="work"></Section>
        <Section id="resume"></Section>
      </Main>
      <Footer>Footer</Footer>
    </>
  );
}

export default App;
