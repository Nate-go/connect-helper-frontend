import { RouterProvider } from "react-router-dom";
import 'rsuite/dist/rsuite-no-reset.min.css';

import router from "@/routes";
import '@/App.css'


const App = () => {
  return (
    <>
       <RouterProvider router={ router} />
    </>
  );
}

export default App
