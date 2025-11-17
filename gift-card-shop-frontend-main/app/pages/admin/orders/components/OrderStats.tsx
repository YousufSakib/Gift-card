import OrderSummaryCard from '~/components/shared/admin/OrderSummaryCard';
import Loader from '~/components/shared/Loader';
import { TotalIncomeIcon, TotalOrdersIcon } from '~/constants/icons';
import { useFetch } from '~/hooks/useFetch';

export default function OrderStats() {
    // Data Fetch
    const { data, loading } = useFetch<OrderSummary>('/order/summary');

    if (loading) return <Loader />;

    return (
        <div className="flex items-center gap-6">
            <OrderSummaryCard
                title="Total orders"
                total={String(data?.totalOrders)}
                icon={<TotalOrdersIcon className="size-14" />}
                className="w-full"
                showDetails={false}
            />
            <OrderSummaryCard
                title="Total income"
                total={String(data?.totalIncome?.toFixed(2))}
                icon={<TotalIncomeIcon className="size-14" />}
                className="w-full"
                showCurrency
                showDetails={false}
            />
        </div>
    );
}
