import { useState } from "react";
import "./App.css";
import { ModalContainer } from "./containers/ModalContainer";
import { TableContainer } from "./containers/TableContainer";

function App() {
  const [isModalActive , setIsModalActive] = useState(false)

  return (
    <>
      <TableContainer />
      <ModalContainer active={isModalActive} />
    </>
  );
}

export default App;
