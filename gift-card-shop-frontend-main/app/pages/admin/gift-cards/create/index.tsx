import AdminPageWrapper from '~/components/shared/admin/AdminPageWrapper';
import GitfCardForm from '../components/GitfCardForm';

type Props = {};

const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Gift Cards', href: '/admin/gift-cards' },
    { label: 'Add new card' },
];

export default function CreateGiftCardPage({}: Props) {
    return (
        <AdminPageWrapper breadcumbItems={breadcrumbItems} pageTitle="Add new card">
            <GitfCardForm />
        </AdminPageWrapper>
    );
}
