import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import Button from '~/components/shared/Button';
import Modal from '~/components/shared/Modal';
import Table from '~/components/shared/table/Table';
import TableContext from '~/components/shared/table/TableContext';
import TablePagination from '~/components/shared/table/TablePagination';
import TableWrapper from '~/components/shared/table/TableWrapper';
import { PlusIcon } from '~/constants/icons';
import {
    giftCardStatusOptions,
    giftCardTableColumns,
    mapGiftCardsToTableData,
    type GiftCardTable,
} from '~/constants/tables/guftCardTable';
import { useFetch } from '~/hooks/useFetch';
import { useMutation } from '~/hooks/useMutation';
import GiftCardDetails from './GiftCardDetails';

type Props = {};

export default function GiftCardTable({}: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [giftCard, setGiftCard] = useState<{ data: GiftCardTable | null; show: boolean }>({
        data: null,
        show: false,
    });

    const navigate = useNavigate();

    // Fetch Data
    const { data, refetch } = useFetch<APIResponse<GiftCard>>('/cards', {
        params: { page: currentPage },
    });
    const { docs, ...paginationData } = data || {};

    const giftCardsData = docs as GiftCard[];

    const giftCardTableData = mapGiftCardsToTableData(giftCardsData);

    const paginationOptions = {
        ...paginationData,
        onPageChange: (page: number) => setCurrentPage(page),
    };

    const actions = [
        {
            type: 'view',
            onClick: (row: GiftCardTable) => setGiftCard(prev => ({ data: row, show: !prev.show })),
        },
        {
            type: 'edit',
            onClick: (row: GiftCardTable) =>
                navigate(`/admin/gift-cards/edit/${row.productCode.replace('#', '')}`),
        },
    ];

    // Update Gift Card API
    const { mutate: updateStatus } = useMutation('patch');

    const handleStatus = async (row: GiftCardTable, newStatus: string) => {
        try {
            await updateStatus(`/card/${row.productCode.replace('#', '')}`, {
                status: newStatus === 'ACTIVE' ? true : false,
            });

            toast.success('Status updated successfully');
            refetch();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Status update failed!');
        }
    };

    return (
        <TableWrapper>
            <TableContext title="All gift cards">
                <Link to="/admin/gift-cards/create">
                    <Button title="Add new card" icon={<PlusIcon />} iconPosition="before" />
                </Link>
            </TableContext>

            <Table<GiftCardTable>
                columns={giftCardTableColumns}
                data={giftCardTableData}
                statusDropdown
                statusOptions={giftCardStatusOptions}
                actions={actions}
                onStatusChange={handleStatus}
            />
            <TablePagination paginationOptions={paginationOptions} />

            <Modal
                show={giftCard.show}
                onClose={() => setGiftCard(prev => ({ ...prev, show: !prev.show }))}
                width="min-w-[64rem] bg-surface-300"
                height="h-fit"
            >
                <GiftCardDetails giftCard={giftCard.data as GiftCardTable} />
            </Modal>
        </TableWrapper>
    );
}
