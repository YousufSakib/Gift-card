import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '~/components/shared/Button';
import UserSectionHeading from '~/components/shared/UserSectionHeading';
import UserSectionWrapper from '~/components/shared/UserSectionWrapper';
import { ArrowRightIcon } from '~/constants/icons';
import { useFetch } from '~/hooks/useFetch';
import { store } from '~/store/store';
import GiftCardList from './GiftCardList';

export default function GiftCardsSection() {
    const rootState = store((state: RootState) => state);

    const { data } = useFetch<APIResponse<GiftCard>>('/cards', { params: { limit: 8, status:true } });

    useEffect(() => {
        if (data) {
            rootState.setGiftCards(data?.docs);
        }
    }, [data]);

    return (
        <UserSectionWrapper id="gift-cards">
            <div className="flex flex-col gap-6 lg:flex-row items-center justify-between">
                <UserSectionHeading
                    title="Available cards"
                    subTitle="Discover our top picks just for you"
                    className="lg:items-start lg:justify-start lg:text-left"
                />

                <Link to="/gift-cards">
                    <Button
                        title="See all cards"
                        variant="ghost"
                        icon={<ArrowRightIcon className="size-5" />}
                    />
                </Link>
            </div>

            {rootState?.giftCards && <GiftCardList giftCards={rootState?.giftCards} />}
        </UserSectionWrapper>
    );
}
