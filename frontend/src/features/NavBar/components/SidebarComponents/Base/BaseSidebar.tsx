import { useNavigate } from "react-router-dom";

function Button({children, route}: {children: React.ReactNode, route: string}) {
    const navigate = useNavigate();
    return (
        <li>
            <a role="button" aria-label={typeof children === 'string' ? children : 'Navigation button'} onClick={() => navigate(route)}>
                {children}
            </a>
        </li>
    )
}

function Header({title, children}: {title: string, children: React.ReactNode}) {
    return (
        <>
        <h4 className="text-lg font-bold" aria-label={`Section header: ${title}`}>
            {title}
        </h4>
        
        {children}
        </>
    )
}

// This determines the components that can be used in the sidebar
interface SidebarComposition {
    Header: typeof Header;
    Button: typeof Button;
}

/**The Base Sidebar component used to create the sidebar
 * 
 * @param children - The children of the sidebar. Use the Button and Header components to create the sidebar.
 */
const Sidebar: React.FC<{ children: React.ReactNode }> & SidebarComposition = ({ children }) => {
    return (
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4" role="navigation" aria-label="Main navigation">
            {children}
        </ul>
    )
}


// This is how you add the components to the Sidebar component
Sidebar.Header = Header;
Sidebar.Button = Button;
export default Sidebar;