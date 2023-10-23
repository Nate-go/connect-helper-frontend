
import { Outlet } from "react-router-dom";
import { BaseComponent } from "@/fregments";


const MainLayout = () => {
    return (
        <div className="flex flex-row w-full">
            <BaseComponent>
                <Outlet></Outlet>
            </BaseComponent>            
        </div>
    );
}

export default MainLayout