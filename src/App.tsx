import './App.css';
import { RootStoreContext } from './stores/root-store-context';
import RootStore from './stores/root-store';
import { observer } from 'mobx-react-lite';
import Wrapper from './components/wrapper';

const App = observer(() => {
  const rootStore = new RootStore();  

  return (
    <RootStoreContext.Provider value={rootStore}>
      <Wrapper />
    </RootStoreContext.Provider>
  );
});



export default App;
