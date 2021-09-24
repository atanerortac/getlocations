import "./App.css";
import Header from "./components/Header";
import styled from "styled-components";
import Feed from "./components/Feed";

function App() {
  return (
    <div>
      <Header />
      <Main>
        <Feed />
      </Main>
    </div>
  );
}

export default App;

const Main = styled.main`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;
