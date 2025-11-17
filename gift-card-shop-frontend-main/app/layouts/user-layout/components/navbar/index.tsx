import { Link } from 'react-router';
import Logo from '~/assets/images/Kimscard-Logo.png';
import LargeScreenNav from './LargeScreenNav';
import MobileNav from './MobileNav';

export default function Navbar() {
    return (
        <nav
            className="sticky top-0 bg-surface-50 z-50"
            style={{ boxShadow: '0px 2px 10px 0px #11182714' }}
        >
            <div className="container">
                <div className="py-2 flex items-center justify-between">
                    <Link to="/" className='h-16 p-2'>
                        <img src={Logo} className='object-contain h-full w-full' alt="Logo of Gift card" />
                    </Link>

                    <div>
                        <LargeScreenNav />
                        <MobileNav />
                    </div>
                </div>
            </div>
        </nav>
    );
}
