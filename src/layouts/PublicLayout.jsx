
import { Outlet } from "react-router-dom";
import { GuestComponent } from "@/fregments";

const PublicLayout = () => {
    return (
        <div>
            <GuestComponent>
                <Outlet></Outlet>
            </GuestComponent>
        </div>
    )
}

export default PublicLayout