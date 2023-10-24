import { RouterProvider } from "react-router-dom";
import 'rsuite/dist/rsuite-no-reset.min.css';

import router from "@/routes";
import '@/App.css'


function App() {
  return (
    <>
       <RouterProvider router={ router} />
    </>
  )
}

export default App
