import { useState } from 'react';
import { NavLink } from 'react-router';
import Divider from '~/components/shared/Divider';
import { navItems } from '~/constants/data';
import { CloseIcon, MenuIcon } from '~/constants/icons';
import { cn } from '~/lib/cn';

export default function MobileNav() {
    const [showNav, setShowNav] = useState(false);

    const toogleNav = () => setShowNav(prev => !prev);

    return (
        <div className="lg:hidden">
            <MenuIcon onClick={toogleNav} />

            <div
                className={cn(
                    'fixed top-0 left-0 bg-surface-50 min-h-full min-w-full transition-transform duration-500',
                    showNav ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex flex-col gap-8 px-4 py-16">
                    <CloseIcon onClick={toogleNav} className="ml-auto text-primary-900" />

                    <ul className="flex flex-col gap-3">
                        {navItems.map(({ label, link }, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link}
                                    className={({ isActive }) =>
                                        `p-md ${isActive && !link.includes('#') ? 'text-primary-500' : ''}`
                                    }
                                    onClick={toogleNav}
                                >
                                    {label}
                                </NavLink>

                                {navItems.length - 1 !== index && (
                                    <Divider className="bg-surface-500 mt-3" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
