import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Logo from '~/assets/images/Kimscard-Logo.png';
import Checkbox from '~/components/shared/Checkbox';
import Input from '~/components/shared/Input';
import SubmitButton from '~/components/shared/SubmitButton';
import { EyeIcon, EyeSlashIcon } from '~/constants/icons';
import { useMutation } from '~/hooks/useMutation';
import { store } from '~/store/store';

type SignInFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const setAdminForgetPassword = store((state: RootState) => state.setAdminForgetPassword);
    const setUser = store((state: RootState) => state.setUser);

    const { control, handleSubmit } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const { mutate: signIn, loading, success } = useMutation<Partial<User>>('post');

    const onSubmit = async (data: SignInFormData) => {
        toast.promise(signIn('/user/login', data), {
            loading: 'Signing in...',
            success: response => {
                setUser(response as User);
                navigate('/admin/dashboard');
                return 'Signed in successfully!';
            },
            error: 'Invalid credentials or network issue. Please try again.',
        });
    };

    return (
        <div className="max-w-lg w-full p-5 sm:p-10 bg-surface-50 rounded-2xl">
            <div className="inline-flex w-full flex-col justify-start items-center gap-6">
                <div className="min-w-16 min-h-full">
                    <img src={Logo} alt="Logo" className="w-full h-full" />
                </div>
                <div className="max-w-80 flex flex-col items-center justify-center gap-3 text-center">
                    <h2 className="font-oswald">Welcome Back</h2>
                    <span className="p-lg">Sign in to manage your store and track performance</span>
                </div>

                <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
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

                        <div className="relative">
                            <Input
                                control={control}
                                name="password"
                                placeholder="Enter your password"
                                label="Password"
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

                        <div className="flex items-center justify-between">
                            <Checkbox control={control} name="rememberMe" label="Remember me" />
                            <span
                                className="p-md cursor-pointer underline"
                                onClick={() => setAdminForgetPassword('forget-password')}
                            >
                                Forgot password
                            </span>
                        </div>
                    </div>

                    <SubmitButton title="Sign in" loading={loading} loadingText="Signing In" />
                </form>
            </div>
        </div>
    );
}
