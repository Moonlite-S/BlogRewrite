import { Outlet } from "react-router-dom";
import Sidebar from "./SidebarComponents/Base/BaseSidebar";
import { TfiAlignJustify } from "react-icons/tfi";

export function NavBar() {
  return (
    <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button fixed top-2 left-2 z-1" aria-label="Open drawer">
                <TfiAlignJustify className="text-xl" />
            </label>
            
            <Outlet />
        </div>

        <div className="drawer-side z-2">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

            <Sidebar>
                <Sidebar.Header title="Home">
                    <Sidebar.Button route="/">
                        Home
                    </Sidebar.Button>
                    <Sidebar.Button route="/blogs">
                        Blogs
                    </Sidebar.Button>
                </Sidebar.Header>

                <Sidebar.Header title="Admin">
                    <Sidebar.Button route="/login">
                        Login
                    </Sidebar.Button>
                </Sidebar.Header>
            </Sidebar>
        </div>
    </div>
  )
}