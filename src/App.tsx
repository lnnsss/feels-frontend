import { observer } from 'mobx-react-lite';
import './App.css'
import AdminLayout from './adminLayout';
import Layout from './layout';
import TokenStore from './stores/token-store';

const App = observer(() => {    
  const isAdmin = TokenStore.hasRole('ADMIN');

  return (
    <div className="wrapper">
    {
        isAdmin
        ? <AdminLayout />
        : <Layout />
    }
    </div>
  )
})

export default App
