import React from 'react';
import { useParams } from 'react-router';
import AdminPageWrapper from '~/components/shared/admin/AdminPageWrapper';
import GitfCardForm from '../components/GitfCardForm';
import { useFetch } from '~/hooks/useFetch';
import Loader from '~/components/shared/Loader';

type Props = {};

const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Gift Cards', href: '/admin/gift-cards' },
    { label: 'Edit card' },
];

export default function EditGiftCardPage({}: Props) {
    const params = useParams();

    const { data, loading } = useFetch<GiftCard>(`card/${params.id}`);

    if (loading || !data) return <Loader />;

    return (
        <AdminPageWrapper breadcumbItems={breadcrumbItems} pageTitle="Edit card">
            <GitfCardForm apiData={data} isEdit />
        </AdminPageWrapper>
    );
}
