import { Outlet } from 'react-router';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Faq from './components/Faq';
import GrabGiftCard from './components/GrabGiftCard';
import TawkChat from '~/components/shared/TawkChat';

export default function UserLayout() {
    return (
        <>
            <Navbar />
            <TawkChat />

            <Outlet />

            <GrabGiftCard />
            <Faq />
            <Footer />
        </>
    );
}
