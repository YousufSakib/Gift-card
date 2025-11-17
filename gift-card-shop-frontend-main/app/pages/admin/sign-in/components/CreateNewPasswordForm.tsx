import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '~/components/shared/Input';
import SuccessfulPasswordChangeModal from '~/components/shared/SuccessfulPasswordChangeModal';
import { EyeIcon, EyeSlashIcon } from '~/constants/icons';
import { useMutation } from '~/hooks/useMutation';
import { store } from '~/store/store';
import SignInCardWrapper from './SignInCardWrapper';
import SubmitButton from '~/components/shared/SubmitButton';

type Props = {};

type FormData = {
    newPassword: string;
    reEnternewPassword: string;
};

export default function CreateNewPasswordForm({}: Props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);

    const setAdminForgetPassword = store((state: RootState) => state.setAdminForgetPassword);
    const setForgotEmail = store((state: RootState) => state.setForgotEmail);

    const { control, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            newPassword: '',
            reEnternewPassword: '',
        },
    });
    const newPassword = watch('newPassword');

    const { mutate: changePassword, loading, success } = useMutation('post');

    const onSubmit = async (data: FormData) => {
        toast.promise(changePassword('/user/reset-password', { password: data.newPassword }), {
            loading: 'Resetting password...',
            success: () => {
                setShowSuccessModal(true);
                // setAdminForgetPassword(null);
                // setForgotEmail('');
                return 'Password reset successfully!';
            },
            error: 'Failed to reset password. Please try again.',
        });
    };

    const handleClose = async () => {
        setShowSuccessModal(false);
        setForgotEmail('');
        setAdminForgetPassword(null);
    };

    return (
        <SignInCardWrapper
            title="Create a New Password"
            subTitle="Set a new password that is at least 8 characters long and includes a mix of letters, numbers, and symbols. Avoid using common words or previously used passwords."
        >
            <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
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
                            validate: value => value === newPassword || 'Passwords do not match',
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

                <SubmitButton
                    title="Set Password"
                    loading={loading}
                    loadingText="Setting"
                    disabled={loading || newPassword !== watch('reEnternewPassword')}
                />
            </form>
            <SuccessfulPasswordChangeModal show={showSuccessModal} onClose={handleClose} />
        </SignInCardWrapper>
    );
}
