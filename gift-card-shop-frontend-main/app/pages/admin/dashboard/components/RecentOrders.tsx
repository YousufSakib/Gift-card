import { Link } from 'react-router';
import Button from '~/components/shared/Button';
import Table from '~/components/shared/table/Table';
import TableContext from '~/components/shared/table/TableContext';
import TableWrapper from '~/components/shared/table/TableWrapper';
import { ArrowUpDiagonalIcon } from '~/constants/icons';
import { orderTableColumns, mapOrdersToTableData } from '~/constants/tables/orderTable';
import { useFetch } from '~/hooks/useFetch';

export default function RecentOrders() {
    const { data } = useFetch<APIResponse<Order>>('/order/all', { params: { limit: 5 } });
    const orders = data?.docs as Order[];

    const orderTableData = mapOrdersToTableData(orders);

    return (
        <div className="col-span-full">
            <TableWrapper>
                <TableContext title="Recent Orders">
                    <Link to="/admin/orders">
                        <Button title="Details" variant="ghost" icon={<ArrowUpDiagonalIcon />} />
                    </Link>
                </TableContext>

                <Table columns={orderTableColumns} data={orderTableData} />
            </TableWrapper>
        </div>
    );
}
