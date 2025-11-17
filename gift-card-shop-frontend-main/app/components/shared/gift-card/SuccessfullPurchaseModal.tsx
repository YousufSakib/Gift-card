import { useRef } from 'react';
import { Link } from 'react-router';
import Button from '../Button';
import Modal from '../Modal';
import { CopyIcon, DownloadIcon, SuccessIcon } from '~/constants/icons';
import { useCopyToClipboard } from '~/hooks/useCopyToClipboard';
import GiftCardCoupon, { type GiftCardCouponHandle } from './GiftCardCoupon';

type Props = { show: boolean; onClose: () => void; order: Order | null };

export default function SuccessfullPurchaseModal(props: Props) {
    const { copyToClipboard } = useCopyToClipboard();

    const couponRef = useRef<GiftCardCouponHandle>(null);
    const handleDownload = () => couponRef.current?.downloadImage();

    if (!props?.order) return null;

    return (
        <Modal show={props.show} onClose={props.onClose} height="h-fit" width="w-[40%]">
            <div className="flex flex-col items-center justify-center gap-8 text-center">
                <div className="flex flex-col items-center gap-8">
                    <SuccessIcon className="size-[100px] lg:size-[150px]" />
                    <h2 className="text-green-600 capitalize font-oswald">
                        Successfully purchased
                    </h2>
                </div>

                <p className="p-sm lg:p-lg text-content-400">
                    You have successfully purchased the gift cards. The coupon is given below or you
                    can download the code.
                </p>

                <div className="flex items-center gap-6">
                    <div
                        className="flex items-center gap-3 px-8 py-3 bg-primary-50 text-primary-500 rounded-lg cursor-pointer"
                        onClick={() => copyToClipboard(props?.order?.cardCode || '')}
                    >
                        <span className="p-md">{props?.order?.cardCode}</span>
                        <CopyIcon />
                    </div>

                    <div
                        className="p-3 rounded-lg bg-primary-50 text-primary-500 cursor-pointer"
                        onClick={handleDownload}
                    >
                        <DownloadIcon />
                    </div>
                </div>

                <Link to="/gift-cards" onClick={props.onClose}>
                    <Button title="Continue shopping" />
                </Link>
            </div>

            <GiftCardCoupon ref={couponRef} order={props?.order} />
        </Modal>
    );
}
