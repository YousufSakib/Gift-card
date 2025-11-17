import { useForm } from 'react-hook-form';
import AdminPageWrapper from '~/components/shared/admin/AdminPageWrapper';
import Input from '~/components/shared/Input';
import SettingsWrapper from './components/SettingsWrapper';

const breadcrumbItems = [{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'settings' }];

export default function AdminSettingsPage() {
    const { control } = useForm({defaultValues: { password: '111111111111' }});

    return (
        <AdminPageWrapper breadcumbItems={breadcrumbItems} pageTitle="settings">
            <SettingsWrapper title="Password">
                <Input
                    control={control}
                    name="password"
                    placeholder="Enter your email"
                    label="Password"
                    type='password'
                    disabled
                    rules={{ required: 'Required Email' }}
                />
            </SettingsWrapper>
        </AdminPageWrapper>
    );
}
