import { RouterProvider } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css'
import router from "@/routes";
import '@/App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'suneditor/dist/css/suneditor.min.css';
import 'rsuite/Button/styles/index.less';
import 'rsuite/ButtonToolbar/styles/index.less';
import '@coreui/coreui/dist/css/coreui.min.css'

const App = () => {

  return (
    <>
      <RouterProvider router={ router} />
      <ToastContainer 
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default App
