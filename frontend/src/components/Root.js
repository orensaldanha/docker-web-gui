import { Outlet, useLocation } from "react-router-dom"
import Dashboard from "./Dashboard";
import Header from "./Header"

const Root = () => {
    const location = useLocation();
    
    return (
        <div>
            <Header />
            {location.pathname === "/" ? <Dashboard /> : <Outlet />}
        </div>
    )
}

export default Root