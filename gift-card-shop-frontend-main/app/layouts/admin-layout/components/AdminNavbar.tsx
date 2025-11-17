import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '~/assets/images/Kimscard-Logo.png';
import Avatar from '~/assets/images/avatar.png';
import { envConfig } from '~/config/envConfig';
import { adminNavItems } from '~/constants/data';
import { SettingsIcon } from '~/constants/icons';
import { store } from '~/store/store';
import AvatarOptions from './AvatarOptions';

type Props = {};

export default function AdminNavbar({ }: Props) {
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const userAvatar = store((state: RootState) => state.user?.avatar);

    return (
        <nav className="p-6 shadow-[0px_4px_2px_0px_rgba(17,24,39,0.04)] sticky top-0 bg-surface-50 z-50">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-30">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="h-[60px] object-contain" />
                    </Link>

                    <ul className="inline-flex items-center">
                        {adminNavItems.map((item, index) => (
                            <li key={index} className="p-4">
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `text-sm font-medium hover:text-primary-500 ${isActive ? 'text-primary-500' : 'text-surface-900'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-8">
                    <Link
                        to="/admin/settings"
                        className="size-8 bg-surface-500 rounded-full flex items-center justify-center"
                    >
                        <SettingsIcon className="text-primary-500 size-6" />
                    </Link>

                    <div className="relative">
                        <div
                            className="size-10 border border-primary-500 rounded-full flex items-center justify-center cursor-pointer"
                            onClick={() => setShowAvatarOptions(!showAvatarOptions)}
                        >
                            <img
                                src={`${envConfig.API_BASE_URL}/${userAvatar}` || Avatar}
                                alt="Avatar"
                                className="size-8 object-cover rounded-full"
                            />
                        </div>
                        <AvatarOptions
                            show={showAvatarOptions}
                            onClose={() => setShowAvatarOptions(false)}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
