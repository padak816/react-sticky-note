import React from "react";
import { MemoProvider } from "./store/memo";
import MemoContainer from "./components/MemoContainer";

function App() {
  return (
    <MemoProvider>
      <MemoContainer />
    </MemoProvider>
  );
}

export default App;
