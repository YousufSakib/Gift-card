import { useState } from 'react';
import Button from '../Button';
import BuyCardModal from './BuyCardModal';
import { envConfig } from '~/config/envConfig';

type Props = { data: GiftCard };

export default function GiftCard({ data }: Props) {
    const [showBuyNowModal, setShowBuyNowModal] = useState<boolean>(false);

    return (
        <div className="w-full flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4 group">
                <div className="w-full h-[12rem] lg:h-[25rem] rounded-xl flex items-center justify-center overflow-hidden border border-[#F4F3EE] bg-[#F4F3EE] relative">
                    <img
                        src={`${envConfig.API_BASE_URL}/${data?.image}`}
                        alt={`gift-card-${data?.name}`}
                        className="w-full h-full object-contain"
                    />

                    <div className="hidden lg:block absolute inset-0 group-hover:bg-surface-800/60 transition-colors duration-500">
                        <div className="relative w-full h-full">
                            <div className="absolute bottom-[-100%] left-1/2 -translate-x-1/2 group-hover:bottom-1/2 group-hover:translate-y-1/2 transition-all duration-500 ease-in-out">
                                <Button title="Buy now" onClick={() => setShowBuyNowModal(true)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 lg:gap-3">
                    <div className="flex flex-col gap-2">
                        {/* Mobile */}
                        <span className="p-lg font-semibold lg:hidden">{data?.name}</span>
                        {/* Large */}
                        <h5 className="hidden lg:block font-semibold">{data?.name}</h5>

                        <p className="p-sm text-content-400">{data?.description}</p>
                    </div>

                    {/* Mobile */}
                    <p className="text-primary-500 p-lg font-semibold lg:hidden">
                        {data?.price} <span className="p-sm text-content-400">(TRC/BEP)</span>
                    </p>
                    {/* Large */}
                    <h5 className="text-primary-500 font-semibold hidden lg:block">
                        {data?.price} <span className="p-sm text-content-400">(TRC/BEP)</span>
                    </h5>
                </div>
            </div>

            <Button
                title="Buy now"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowBuyNowModal(true)}
            />

            <BuyCardModal
                show={showBuyNowModal}
                onClose={() => setShowBuyNowModal(false)}
                data={data}
            />
        </div>
    );
}
