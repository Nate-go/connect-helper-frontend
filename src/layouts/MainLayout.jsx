
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div>
            Main Layout here
            <Outlet></Outlet>
        </div>
    )
}

export default MainLayout