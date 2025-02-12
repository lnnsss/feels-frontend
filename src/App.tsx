import './App.css';
import AdminLayout from './components/adminLayout';
import Layout from './components/layout';
import Modals from './components/Modals';
import { RootStoreContext, useStores } from './stores/root-store-context';
import RootStore from './stores/root-store';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const rootStore = new RootStore();  

  return (
    <RootStoreContext.Provider value={rootStore}>
      <Wrapper />
    </RootStoreContext.Provider>
  );
});

const Wrapper = observer(() => {
  const {
    modal: { isModalActive },
    token: { hasRole }
  } = useStores();  

  const isAdmin = hasRole('ADMIN');

  return (
    <div className="wrapper">
      {isAdmin ? <AdminLayout /> : <Layout />}
      {isModalActive && <Modals />}
    </div>
  );
});

export default App;
