import { Outlet } from "react-router-dom";
import { HeaderLapCode } from "./components/HeaderLapcode/HeaderLapcode";

export const LayoutWithHeaderFooter = () => {
    return (
        <>
            <HeaderLapCode />
            <main>
                <Outlet />
            </main>

        </>
    )
}