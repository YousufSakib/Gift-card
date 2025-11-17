import React from 'react';
import AdminSignInBg from '~/assets/images/admin-login-bg.png';
import SignInForm from './components/SignInForm';
import ForgetPasswordForm from './components/ForgetPasswordForm';
import { store } from '~/store/store';
import ForgetPasswordNavigation from './components/ForgetPasswordNavigation';
import ForgetPasswordOtpForm from './components/ForgetPasswordOtpForm';
import CreateNewPasswordForm from './components/CreateNewPasswordForm';
import { useNavigate } from 'react-router';

export default function SignInPage() {
    const adminForgetPassword = store((state: RootState) => state.adminForgetPassword);
    const navigate = useNavigate();
    const user = store((state: RootState) => state.user);

    React.useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [user, navigate]);

    if (user && Object.keys(user).length > 0) {
        return null;
    }

    const renderForm = () => {
        switch (adminForgetPassword) {
            case 'forget-password':
                return <ForgetPasswordForm />;
            case 'otp':
                return <ForgetPasswordOtpForm />;
            case 'change-password':
                return <CreateNewPasswordForm />;
            default:
                return <SignInForm />;
        }
    };

    return (
        <main
            style={{ backgroundImage: `url(${AdminSignInBg})` }}
            className="w-full h-[100vh] bg-cover bg-primary-50 bg-no-repeat bg-center relative"
        >
            {adminForgetPassword && <ForgetPasswordNavigation />}
            <section className="flex items-center justify-center h-full">{renderForm()}</section>
        </main>
    );
}
