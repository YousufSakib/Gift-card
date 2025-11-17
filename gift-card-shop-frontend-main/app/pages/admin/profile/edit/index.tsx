import AdminPageWrapper from '~/components/shared/admin/AdminPageWrapper';
import ProfileInfo from '../components/ProfileInfo';
import Button from '~/components/shared/Button';
import { useForm } from 'react-hook-form';
import { store } from '~/store/store';
import Input from '~/components/shared/Input';
import { useState } from 'react';
import { useMutation } from '~/hooks/useMutation';
import Loader from '~/components/shared/Loader';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import SubmitButton from '~/components/shared/SubmitButton';

const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'My Profile', href: '/admin/profile' },
    { label: 'edit' },
];

type FormData = {
    firstName: string;
    lastName: string;
};

export default function EditProfilePage() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const user = store((state: RootState) => state.user);
    const setUser = store((state: RootState) => state.setUser);

    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: { firstName: user?.firstName || '', lastName: user?.lastName || '' },
    });

    const { mutate: updateProfile, loading } = useMutation('patch');

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        const body = {
            firstName: data.firstName,
            lastName: data.lastName,
        };

        formData.append('data', JSON.stringify(body));

        if (selectedImage) {
            formData.append('avatar', selectedImage);
        }

        toast
            .promise(
                updateProfile('/user/me', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }),
                {
                    loading: 'Updating profile...',
                    success: response => {
                        setUser(response as User);
                        return 'Profile updated successfully!';
                    },
                    error: 'Failed to update profile. Please try again.',
                }
            )
            .then(() => {
                navigate('/admin/profile');
            });
    };

    return (
        <AdminPageWrapper breadcumbItems={breadcrumbItems} pageTitle="Edit Profile">
            <ProfileInfo isEdit selectedImage={selectedImage} setSelectedImage={setSelectedImage}>
                <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center gap-4">
                        <Input
                            control={control}
                            name="firstName"
                            rules={{ required: 'FirstName is required' }}
                            className="w-full"
                        />
                        <Input
                            control={control}
                            name="lastName"
                            rules={{ required: 'LastName is required' }}
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-5">
                        <SubmitButton
                            title="Save"
                            loading={loading}
                            loadingText="Saving"
                            className="min-w-[109px]"
                        />
                        <Button
                            title="Cancel"
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/profile')}
                        />
                    </div>
                </form>
            </ProfileInfo>
        </AdminPageWrapper>
    );
}
