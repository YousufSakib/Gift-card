import { Link } from 'react-router';
import Button from '~/components/shared/Button';
import { ArrowUpDiagonalIcon } from '~/constants/icons';
import HeroDiscountShape from '~/assets/images/discount-shape.svg?react';
import DiscountCard1 from '~/assets/images/discount-card-1.png';
import DiscountCard2 from '~/assets/images/discount-card-2.png';
import DiscountCard3 from '~/assets/images/discount-card-3.png';

type Props = { totalCards: number | undefined; showLink?: boolean };

export default function TotalAvailableCards({ totalCards, showLink = true }: Props) {
    return (
        <div className="col-span-2 bg-surface-300 p-6 rounded-xl flex items-center justify-between relative">
            <div className=" bg-red-400 h-full">
                <div className="absolute bottom-0 max-w-[200px]">
                    <div className="relative z-20">
                        <HeroDiscountShape className="w-full h-full object-contain z-10" />

                        <img
                            src={DiscountCard1}
                            alt="Discount card 1"
                            className="absolute bottom-[50%] left-2 h-[80%] lg:h-[90%] -z-10"
                        />

                        <img
                            src={DiscountCard3}
                            alt="Discount card 3"
                            className="absolute bottom-[60%] left-1/2 transform -translate-x-1/2 h-[80%] lg:h-[90%] -z-10"
                        />
                        <img
                            src={DiscountCard2}
                            alt="Discount card 2"
                            className="absolute bottom-[50%] right-2 h-[80%] lg:h-[90%] -z-10"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 items-end text-right">
                <div className="flex flex-col gap-3">
                    <span className="p-md">Total Available cards</span>
                    <span className="display-1 text-primary-500">{totalCards}</span>
                </div>

                {showLink && (
                    <Link to="/admin/gift-cards">
                        <Button
                            title="All cards"
                            icon={<ArrowUpDiagonalIcon />}
                            className="px-5 py-2 p-md max-w-[205px]"
                        />
                    </Link>
                )}
            </div>
        </div>
    );
}
