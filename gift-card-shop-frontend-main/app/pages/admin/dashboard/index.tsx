import OrderSummaryCard from '~/components/shared/admin/OrderSummaryCard';
import { TotalIncomeIcon, TotalOrdersIcon } from '~/constants/icons';
import IncomeOverviewStatistics from './components/IncomeOverviewStatistics';
import { useForm } from 'react-hook-form';
import TotalAvailableCards from './components/TotalAvailableCards';
import RecentlyAddedCards from './components/RecentlyAddedCards';
import { useFetch } from '~/hooks/useFetch';
import Loader from '~/components/shared/Loader';
import { useEffect } from 'react';
import RecentOrders from './components/RecentOrders';

type FormData = { dateFilter: string };

export default function AdminDashboardPage() {
    const { control, watch } = useForm<FormData>({ defaultValues: { dateFilter: 'last15days' } });
    const selectedDateFilter = watch('dateFilter');

    // Data Fetch
    const { data: orderSummaryData, loading: orderSummaryLoading } =
        useFetch<OrderSummary>('/order/summary');

    const {
        data: incomeOverviewData,
        loading: incomeOverviewLoading,
        refetch,
    } = useFetch<IncomeOverview[]>('/order/income-overview', {
        params: { period: selectedDateFilter },
    });

    useEffect(() => {
        if (selectedDateFilter) {
            refetch();
        }
    }, [selectedDateFilter]);

    if (orderSummaryLoading) return <Loader />;

    return (
        <section className="grid grid-cols-4 gap-4">
            <OrderSummaryCard
                title="Total orders"
                total={String(orderSummaryData?.totalOrders)}
                icon={<TotalOrdersIcon className="size-8" />}
            />
            <OrderSummaryCard
                title="Total income"
                total={String(orderSummaryData?.totalIncome?.toFixed(2))}
                icon={<TotalIncomeIcon className="size-8" />}
                showCurrency
            />

            <TotalAvailableCards totalCards={orderSummaryData?.totalCards} />

            <IncomeOverviewStatistics
                summary={orderSummaryData}
                incomeBreakdown={incomeOverviewData}
                control={control}
            />

            <RecentlyAddedCards />

            <RecentOrders />
        </section>
    );
}
