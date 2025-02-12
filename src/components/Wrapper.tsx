import { observer } from "mobx-react-lite";
import { useStores } from "../stores/root-store-context";
import AdminLayout from "./adminLayout";
import Layout from "./layout";
import Modals from "./Modals";

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

export default Wrapper;