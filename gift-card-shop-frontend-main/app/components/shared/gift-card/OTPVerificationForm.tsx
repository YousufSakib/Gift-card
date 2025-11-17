import { useForm, Controller } from 'react-hook-form';
import Button from '../Button';
import { useRef } from 'react';
import { store } from '~/store/store';
import toast from 'react-hot-toast';
import { useMutation } from '~/hooks/useMutation';
import Loader from '../Loader';
import SubmitButton from '../SubmitButton';

type FormData = {
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
    otp5: string;
    otp6: string;
};

export default function OTPVerificationForm() {
    const setBuyingState = store((state: RootState) => state.setBuyingState);

    const { control, handleSubmit, getValues, setValue } = useForm<FormData>();

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { mutate: verifyOtp, loading } = useMutation('post');

    const onSubmit = async (data: FormData) => {
        const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;

        try {
            await toast.promise(async () => await verifyOtp('/client/verify-otp', { otp }), {
                loading: 'Verifying Otp...',
                success: () => {
                    setBuyingState('verified');
                    return 'Otp verified successfully';
                },
                error: (err: any) => err?.response?.data?.message || 'Error veryfing otp',
            });
        } catch (error) {
            console.log('OTP:', otp);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (
            e.key === 'Backspace' &&
            !getValues(`otp${index + 1}` as keyof FormData) &&
            inputRefs.current[index - 1]
        ) {
            setValue(`otp${index}` as keyof FormData, '');
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('Text').trim();

        if (/^\d{6}$/.test(pasteData)) {
            e.preventDefault();
            pasteData.split('').forEach((char, i) => {
                setValue(`otp${i + 1}` as keyof FormData, char);
            });
            inputRefs.current[5]?.focus();
        }
    };

    const handleChange = (value: string, index: number) => {
        // Update the form state for the current field
        setValue(`otp${index + 1}` as keyof FormData, value);

        // Move to the next input field if a value is entered
        if (value && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col space-y-3">
                <h4>OTP Verification</h4>
                <span className="p-sm">
                    We’ve sent a 6-digit code to your email. Please check and enter the code to
                    verify the email.
                </span>

                <div className="inline-flex justify-between items-center gap-2 lg:gap-5">
                    {Array(6)
                        .fill(0)
                        .map((_, index) => (
                            <Controller
                                key={index}
                                name={`otp${index + 1}` as keyof FormData}
                                control={control}
                                rules={{
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^\d$/,
                                        message: 'Only numbers are allowed',
                                    },
                                    maxLength: 1,
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        ref={el => {
                                            inputRefs.current[index] = el;
                                        }}
                                        maxLength={1}
                                        className="border border-surface-600 rounded-lg text-center placeholder:text-content-200 p-md outline-surface-700 disabled:text-content-200 disabled:cursor-not-allowed size-10 sm:size-16"
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        onChange={e => {
                                            field.onChange(e);
                                            handleChange(e.target.value, index);
                                        }}
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        onPaste={handlePaste}
                                    />
                                )}
                            />
                        ))}
                </div>
            </div>

            <span
                className="p-lg text-primary-500 text-center underline underline-offset-2 cursor-pointer"
                onClick={() => setBuyingState(null)}
            >
                Didn't receive a code?
            </span>

            <SubmitButton title="Verify" loading={loading} loadingText="Verifying otp" />
        </form>
    );
}
