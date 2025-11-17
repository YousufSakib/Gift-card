import UserSectionWrapper from '~/components/shared/UserSectionWrapper';
import GiftCardsImg from '~/assets/images/grab-gift-card.png';

export default function GrabGiftCard() {
    return (
        <div className="bg-primary-50">
            <UserSectionWrapper>
                <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8">
                    <div className="max-w-[544px] flex flex-col gap-8">
                        <span className="display-5 lg:large-2 text-primary-500 text-center lg:text-left">
                            Grab Your Gift Card Instantly
                        </span>

                        <p className="p-md text-center lg:hidden">
                            Buy trusted gift cards in seconds with secure crypto payment. No extra
                            steps. Just tap and go.
                        </p>
                        <h5 className="hidden lg:block font-normal">
                            Buy trusted gift cards in seconds with secure crypto payment. No extra
                            steps. Just tap and go.
                        </h5>
                    </div>

                    <div>
                        <img src={GiftCardsImg} alt="Gift Cards" className="object-contain" />
                    </div>
                </div>
            </UserSectionWrapper>
        </div>
    );
}
