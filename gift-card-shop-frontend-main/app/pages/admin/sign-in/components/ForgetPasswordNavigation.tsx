import React from 'react';
import Button from '~/components/shared/Button';
import { ArrowRightIcon } from '~/constants/icons';
import { store } from '~/store/store';

type Props = {};

export default function ForgetPasswordNavigation({}: Props) {
    const {
        adminForgetPassword,

        setAdminForgetPassword,
    } = store.getState() as RootState;

    const handleBack = () => {
        if (adminForgetPassword === 'otp') {
            setAdminForgetPassword('forget-password');
        }

        if (adminForgetPassword === 'change-password') {
            setAdminForgetPassword('otp');
        }

        if (adminForgetPassword === 'forget-password') {
            setAdminForgetPassword(null);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-5 lg:px-20 py-10">
            <span className="bg-surface-50 p-2 cursor-pointer rounded-lg" onClick={handleBack}>
                <ArrowRightIcon className="text-primary-500 rotate-180" />
            </span>

            <Button title="Sign in" variant="ghost" onClick={() => setAdminForgetPassword(null)} />
        </div>
    );
}
