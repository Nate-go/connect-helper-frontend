
// import BaseRouter from '@/routes/index.jsx'
import { RouterProvider } from "react-router-dom";
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
