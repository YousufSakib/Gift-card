import AdminPageWrapper from '~/components/shared/admin/AdminPageWrapper';
import ProfileInfo from './components/ProfileInfo';
import Input from '~/components/shared/Input';
import { useForm } from 'react-hook-form';
import { store } from '~/store/store';

const breadcrumbItems = [{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'My Profile' }];

export default function AdminProfilePage() {
    const userEmail = store((state: RootState) => state.user?.email);

    const { control } = useForm({
        defaultValues: { email: userEmail || '' },
    });

    return (
        <AdminPageWrapper breadcumbItems={breadcrumbItems} pageTitle="My Profile">
            <ProfileInfo>
                <Input
                    control={control}
                    name="email"
                    placeholder="Enter your email"
                    label="Email"
                    disabled
                    readOnly
                    rules={{ required: 'Required Email' }}
                />
            </ProfileInfo>
        </AdminPageWrapper>
    );
}
