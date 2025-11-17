import GiftCard from '~/components/shared/gift-card';
import NoDataFound from '~/components/shared/NoDataFound';

type Props = { giftCards: GiftCard[] };

export default function GiftCardList({ giftCards }: Props) {
    if (!giftCards?.length) return <NoDataFound text="No gift cards found" />;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {giftCards?.map(card => <GiftCard key={card._id} data={card} />)}
        </div>
    );
}
