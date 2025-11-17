import { NavLink } from 'react-router';
import { navItems } from '~/constants/data';

type Props = {};

export default function LargeScreenNav({}: Props) {
    return (
        <div className="hidden lg:block">
            <ul className="flex items-center gap-3">
                {navItems.map(({ label, link }, index) => (
                    <li key={index} className="p-4">
                        <NavLink
                            to={link}
                            className={({ isActive }) =>
                                `p-lg font-medium ${isActive && !link.includes('#') ? 'text-primary-500' : ''}`
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
