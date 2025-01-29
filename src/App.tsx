import { observer } from 'mobx-react-lite';
import './App.css'
import AdminLayout from './components/adminLayout';
import Layout from './components/layout';
import TokenStore from './stores/token-store';
import ModalStore from './stores/modal-store';
import Modals from './components/Modals';

const App = observer(() => {
  const isAdmin = TokenStore.hasRole('ADMIN');
  const {isModalActive} = ModalStore

  return (
    <div className="wrapper">
    {
        isAdmin
        ? <AdminLayout />
        : <Layout />
    }
    {
      isModalActive && <Modals />
    }
    </div>
  )
})

export default App
