import { ModalContainer } from "./containers/ModalContainer";
import { TableContainer } from "./containers/TableContainer";

import { AddUsers } from "./components/AddUsers";

import { UserProvider } from "./context/UserContext";

import { useModal } from "./hooks/useModal";

function App() {
  const modal = useModal();

  return (
    <UserProvider>
      <AddUsers onAddClick={modal.setIsModalActive} />
      <TableContainer />
      {modal.isModalActive && (
        <ModalContainer
          handler={modal.setIsModalActive}
          active={modal.isModalActive}
        />
      )}
    </UserProvider>
  );
}

export default App;
