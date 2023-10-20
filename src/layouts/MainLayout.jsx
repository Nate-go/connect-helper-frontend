
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/fregments";


const MainLayout = () => {
    return (
        <>
            <div className="flex-col">
                <Sidebar />
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default MainLayout