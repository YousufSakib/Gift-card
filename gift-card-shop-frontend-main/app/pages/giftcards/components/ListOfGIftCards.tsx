import { useEffect, useState } from 'react';
import GiftCard from '~/components/shared/gift-card';
import Loader from '~/components/shared/Loader';
import NoDataFound from '~/components/shared/NoDataFound';
import UserSectionWrapper from '~/components/shared/UserSectionWrapper';
import { useFetch } from '~/hooks/useFetch';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';
import { store } from '~/store/store';

export default function ListOfGIftCards() {
    const [limit, setLimit] = useState<number>(8);

    const rootState = store((state: RootState) => state);

    const { data } = useFetch<APIResponse<GiftCard>>('/cards', { params: { limit, status: true } });

    useEffect(() => {
        if (data) {
            rootState.setGiftCards(data?.docs);
        }
    }, [data]);

    const observerRef = useIntersectionObserver<HTMLDivElement>({
        handleIntersect: entry => {
            if (entry.isIntersecting) {
                setTimeout(() => setLimit(prevLimit => prevLimit + 8), 1000);
            }
        },
    });

    if (!rootState?.giftCards?.length) return <NoDataFound text="No gift cards found" />;

    return (
        <UserSectionWrapper>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {rootState?.giftCards?.map(card => <GiftCard key={card._id} data={card} />)}
            </div>

            {data?.hasNextPage && <Loader ref={observerRef} text="Loading" />}
        </UserSectionWrapper>
    );
}
