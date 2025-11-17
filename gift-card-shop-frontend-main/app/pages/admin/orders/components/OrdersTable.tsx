import { useState } from 'react';
import Table from '~/components/shared/table/Table';
import TableContext from '~/components/shared/table/TableContext';
import TablePagination from '~/components/shared/table/TablePagination';
import TableWrapper from '~/components/shared/table/TableWrapper';

import {
    mapOrdersToTableData,
    orderTableColumns,
    type OrderTable,
} from '~/constants/tables/orderTable';
import { useFetch } from '~/hooks/useFetch';

export default function OrdersTable() {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, loading } = useFetch<APIResponse<Order>>('/order/all', {
        params: { page: currentPage, status: 'COMPLETED' },
    });

    const { docs, ...paginationData } = data || {};
    const orders = docs as Order[];

    const orderTableData = mapOrdersToTableData(orders, currentPage);
    const paginationOptions = {
        ...paginationData,
        onPageChange: (page: number) => setCurrentPage(page),
    };

    if (loading) return null;

    return (
        <TableWrapper>
            <TableContext title="All Orders" />
            <Table<OrderTable> columns={orderTableColumns} data={orderTableData} />
            <TablePagination paginationOptions={paginationOptions} />
        </TableWrapper>
    );
}
