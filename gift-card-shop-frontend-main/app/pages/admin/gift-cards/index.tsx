import { useFetch } from '~/hooks/useFetch';
import TotalAvailableCards from '../dashboard/components/TotalAvailableCards';
import Loader from '~/components/shared/Loader';
import GiftCardTable from './components/GiftCardTable';

export default function AdminGiftCardsPage() {
    // Data Fetch
    const { data, loading } = useFetch<OrderSummary>('/order/summary');

    if (loading) return <Loader />;

    return (
        <main className="flex flex-col gap-6">
            <TotalAvailableCards totalCards={data?.totalCards} showLink={false} />
            <GiftCardTable />
        </main>
    );
}
