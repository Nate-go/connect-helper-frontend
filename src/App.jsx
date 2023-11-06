import { RouterProvider } from "react-router-dom";
import 'rsuite/dist/rsuite-no-reset.min.css';

import router from "@/routes";
import '@/App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <RouterProvider router={ router} />
      <ToastContainer/>
    </>
  );
}

export default App
