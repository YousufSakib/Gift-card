import { Link } from 'react-router';
import Divider from '~/components/shared/Divider';
import { EditIcon } from '~/constants/icons';
import Avatar from '~/assets/images/avatar.png';
import { store } from '~/store/store';
import { useEffect, useState } from 'react';
import { envConfig } from '~/config/envConfig';

type Props = {
    isEdit?: boolean;
    children: React.ReactNode;
    selectedImage?: File | null;
    setSelectedImage?: React.Dispatch<React.SetStateAction<File | null>>;
};

const ProfileInfo: React.FC<Props> = ({ isEdit = false, ...props }) => {
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const user = store((state: RootState) => state.user);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && props.setSelectedImage) {
            const imageFile = e.target.files[0];
            props.setSelectedImage(imageFile);

            const objectUrl = URL.createObjectURL(imageFile);
            setPreviewImageUrl(objectUrl);
        }
    };

    const avatarSrc = previewImageUrl || `${envConfig.API_BASE_URL}/${user?.avatar}` || Avatar;

    return (
        <div className="flex flex-col gap-8 bg-surface-300 p-6 rounded-xl">
            <div className="flex items-center gap-4">
                <div className="group relative size-20 rounded-full">
                    <img
                        src={avatarSrc}
                        title={`${user?.firstName} ${user?.lastName}`}
                        alt={`avatar of ${user?.firstName} ${user?.lastName}`}
                        className="w-full h-full object-cover rounded-full bg-white"
                    />

                    {isEdit && (
                        <div className="hidden group-hover:block  w-full h-full group-hover:bg-black/20 text-white rounded-full absolute top-0 left-0 cursor-pointer">
                            <div className="relative w-full h-full">
                                <EditIcon className="size-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-start gap-4">
                    <h4 className="font-semibold">
                        {user?.firstName} {user?.lastName}
                    </h4>

                    {!isEdit && (
                        <Link
                            to="/admin/profile/edit"
                            className="flex items-center gap-[0.625rem] text-primary-500"
                        >
                            <EditIcon />
                            <span className="p-md">Edit Profile</span>
                        </Link>
                    )}
                </div>
            </div>

            <Divider className="bg-surface-700" />

            <>{props.children}</>
        </div>
    );
};

export default ProfileInfo;
