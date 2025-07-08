import FSNavbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <FSNavbar/>
            <div id='body'>
                <Outlet />
            </div>
        </>
    );
}
