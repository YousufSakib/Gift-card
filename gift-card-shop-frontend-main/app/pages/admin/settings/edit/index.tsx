import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import AdminPageWrapper from '~/components/shared/admin/AdminPageWrapper';
import Button from '~/components/shared/Button';
import Input from '~/components/shared/Input';
import Loader from '~/components/shared/Loader';
import { EyeIcon, EyeSlashIcon } from '~/constants/icons';
import { useMutation } from '~/hooks/useMutation';
import SettingsWrapper from '../components/SettingsWrapper';
import SubmitButton from '~/components/shared/SubmitButton';

const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'settings', href: '/admin/settings' },
    { label: 'edit' },
];

type FormData = {
    password: string;
    newPassword: string;
    reEnternewPassword: string;
};

export default function EditAdminSettings() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { control, watch, handleSubmit, reset } = useForm<FormData>({
        defaultValues: { password: '', newPassword: '', reEnternewPassword: '' },
    });

    const newPassword = watch('newPassword');
    const reEnterNewPassword = watch('reEnternewPassword');

    const { mutate: updatePassword, loading } = useMutation('patch');

    const onSubmit = async (data: FormData) => {
        const payload = {
            passwordChange: {
                oldPass: data.password,
                newPass: data.newPassword,
            },
        };

        toast
            .promise(updatePassword('/user/me', payload), {
                loading: 'Updating password...',
                success: 'Password updated successfully!',
                error: 'Error updating password',
            })
            .then(() => {
                navigate('/admin/settings');
            });

        reset();
    };

    return (
        <AdminPageWrapper breadcumbItems={breadcrumbItems} pageTitle="settings">
            <SettingsWrapper title="manage password" isEdit>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <Input
                            control={control}
                            name="password"
                            placeholder="Current Password"
                            label="Current Password"
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            }}
                            type={showPassword ? 'text' : 'password'}
                        />

                        <div
                            className="absolute top-[2.8rem] right-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </div>
                    </div>

                    <div className="relative">
                        <Input
                            control={control}
                            name="newPassword"
                            placeholder="Enter a 8 digit password"
                            label="New Password"
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            }}
                            type={showPassword ? 'text' : 'password'}
                        />

                        <div
                            className="absolute top-[2.8rem] right-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </div>
                    </div>

                    <div className="relative">
                        <Input
                            control={control}
                            name="reEnternewPassword"
                            placeholder="Confirm selected password"
                            label="Re-enter Password"
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                                validate: value =>
                                    value === newPassword || 'Passwords do not match',
                            }}
                            type={showPassword ? 'text' : 'password'}
                        />

                        <div
                            className="absolute top-[2.8rem] right-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <SubmitButton
                            title="Change password"
                            loading={loading}
                            disabled={loading || newPassword !== reEnterNewPassword}
                            loadingText="Changing"
                        />

                        <Button
                            title="Cancel"
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/settings')}
                        />
                    </div>
                </form>
            </SettingsWrapper>
        </AdminPageWrapper>
    );
}
