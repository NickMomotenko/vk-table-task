import { ModalContainer } from "./containers/ModalContainer";
import { TableContainer } from "./containers/TableContainer";
import { UserProvider } from "./context/UserContext";
import { useModal } from "./hooks/useModal";

import "./App.css";
import { AddUsers } from "./components/AddUsers";

function App() {
  const modal = useModal();

  return (
    <UserProvider>
      <AddUsers onAddClick={modal.setIsModalActive} />
      <TableContainer />
      {modal.isModalActive && (
        <ModalContainer handler={modal.setIsModalActive} active={modal.isModalActive} />
      )}
    </UserProvider>
  );
}

export default App;
