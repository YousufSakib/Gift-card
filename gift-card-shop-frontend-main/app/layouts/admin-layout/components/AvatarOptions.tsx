import { set } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import Divider from '~/components/shared/Divider';
import { LogoutIcon, PersonIcon } from '~/constants/icons';
import { useMutation } from '~/hooks/useMutation';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { cn } from '~/lib/cn';
import { store } from '~/store/store';

type Props = { show: boolean; onClose: () => void };

export default function AvatarOptions({ show, onClose }: Props) {
    const avatarOptionRef = useOutsideClick<HTMLDivElement>(() => onClose());
    const navigate = useNavigate();
    const setUser = store((state: RootState) => state.setUser);

    const { mutate: logout, loading } = useMutation('post');

    const handleLogout = async () => {
        toast.promise(
            logout('/user/logout'),
            {
                loading: 'Logging out...',
                success: () => {
                    setUser({} as User);
                    onClose();
                    navigate('/admin');
                    return 'Logged out successfully!';
                },
                error: 'Failed to logout. Please try again.',
            }
        );
    };    

    if (!show) return null;

    return (
        <div className="fixed top-0 h-full inset-0 bg-black/20 z-50">
            <div className="relative">
                <div className="absolute top-18 right-6" ref={avatarOptionRef}>
                    <div className="p-3 bg-surface-50 rounded-lg">
                        <ul>
                            <li className={cn(loading && 'pointer-events-none')} onClick={onClose}>
                                <Link
                                    to="/admin/profile"
                                    className="p-[10px] flex items-center gap-[10px] p-md font-medium text-surface-900 hover:text-primary-500"
                                >
                                    <PersonIcon />
                                    Profile
                                </Link>
                            </li>

                            <Divider className="bg-zinc-300" />

                            <li
                                onClick={handleLogout}
                                className={cn(loading && 'pointer-events-none')}
                            >
                                <div className="p-[10px] cursor-pointer flex items-center gap-[10px] p-md font-medium text-primary-500 text-nowrap">
                                    <LogoutIcon />
                                    Log out
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
