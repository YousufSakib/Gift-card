import Input from '~/components/shared/Input';
import SignInCardWrapper from './SignInCardWrapper';
import { useForm } from 'react-hook-form';
import { store } from '~/store/store';
import { useMutation } from '~/hooks/useMutation';
import toast from 'react-hot-toast';
import SubmitButton from '~/components/shared/SubmitButton';

type Props = {};
type FormData = {
    email: string;
};

export default function ForgetPasswordForm({}: Props) {
    const setForgotEmail = store((state: RootState) => state.setForgotEmail);
    const setAdminForgetPassword = store((state: RootState) => state.setAdminForgetPassword);
    const forgotEmail = store((state: RootState) => state.forgotEmail);

    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            email: forgotEmail || '',
        },
    });

    const { mutate: sendOtp, loading } = useMutation('post');

    const onSubmit = async (data: FormData) => {
        toast.promise(sendOtp('/user/send-otp', data), {
            loading: 'Sending OTP...',
            success: () => {
                setForgotEmail(data.email);
                setAdminForgetPassword('otp');
                return 'OTP sent successfully!';
            },
            error: 'Failed to send OTP. Please check the email and try again.',
        });
    };

    return (
        <SignInCardWrapper
            title="Forgot password"
            subTitle="Enter your registered email, and we'll send you a OTP to verify your identity."
        >
            <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    control={control}
                    name="email"
                    placeholder="Enter your email"
                    label="Email"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address',
                        },
                    }}
                />

                <SubmitButton title="Send OTP" loading={loading} loadingText="Sending" />
            </form>
        </SignInCardWrapper>
    );
}
