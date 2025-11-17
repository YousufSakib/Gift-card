import { useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import { store } from '~/store/store';
import { useMutation } from '~/hooks/useMutation';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import SubmitButton from '../SubmitButton';

type FormData = { email: string };

export default function BuyerEmailForm() {
    const setBuyerEmail = store((state: RootState) => state.setBuyerEmail);
    const setBuyingState = store((state: RootState) => state.setBuyingState);
    const buyerEmail = store((state: RootState) => state.buyerEmail);

    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            email: buyerEmail || '',
        },
    });

    const { mutate: sendOtp, loading } = useMutation('post');

    const onSubmit = async (data: FormData) => {
        try {
            await toast.promise(async () => await sendOtp('/client/send-otp', data), {
                loading: 'Sending Otp...',
                success: () => {
                    setBuyerEmail(data.email);
                    setBuyingState('otp');

                    return 'Otp sent successfully';
                },
                error: (err: any) => err?.response?.data?.message || 'Error sending otp',
            });
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-8">
            <div className="space-y-2">
                <Input
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter a valid email"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address',
                        },
                    }}
                />

                <span className="p-sm text-content-400">
                    We will send a verification code into you email. Please check that code and
                    verify your email
                </span>
            </div>

            <SubmitButton title="Send Code" loading={loading} loadingText="Sending otp" />
        </form>
    );
}
