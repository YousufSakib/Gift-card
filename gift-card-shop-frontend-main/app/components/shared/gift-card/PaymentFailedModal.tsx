import { CloseIcon, FailedIcon } from '~/constants/icons';
import Modal from '../Modal';
import Button from '../Button';
import { useOutsideClick } from '~/hooks/useOutsideClick';

type Props = { show: boolean; onClose: () => void };

export default function PaymentFailedModal(props: Props) {
    const paymentFailedModalRef = useOutsideClick<HTMLDivElement>(() => props.onClose());

    if (!props.show) return null;

    return (
        // <Modal show={props.show} onClose={props.onClose} height="h-fit" width="lg:w-[40%]">
        <div
            className={`fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center z-[99999]`}
            onClick={props.onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-full p-6 relative"
                onClick={e => e.stopPropagation()}
                ref={paymentFailedModalRef}
            >
                <div className="flex flex-col items-center justify-center gap-8 text-center p-10">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <FailedIcon className="size-[100px] lg:size-[150px]" />

                        <span className="text-center text-red-500 text-[32px] font-semibold font-oswald leading-[43px]">
                            Payment Failed
                        </span>
                    </div>

                    <p className="p-sm lg:p-lg text-content-400 text-center">
                        We couldn’t process your payment. This may have happened due to low wallet
                        balance, network issues, or an incorrect transaction. Please verify your
                        payment and try again
                    </p>

                    <Button onClick={props.onClose} title="Try Again" className="w-full" />
                </div>

                <div className="absolute top-[20px] right-[20px] z-50">
                    <CloseIcon
                        className="text-primary-500 cursor-pointer"
                        onClick={props.onClose}
                    />
                </div>
            </div>
        </div>
        // </Modal>
    );
}
