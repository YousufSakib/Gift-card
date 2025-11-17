import React from 'react';
import OrderStats from './components/OrderStats';
import OrdersTable from './components/OrdersTable';

type Props = {};

export default function AdminOrdersPage({}: Props) {
    return (
        <main className="flex flex-col gap-6">
            <OrderStats />
            <OrdersTable />
        </main>
    );
}
