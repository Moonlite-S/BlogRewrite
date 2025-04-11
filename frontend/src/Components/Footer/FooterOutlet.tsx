import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export function FooterOutlet() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}