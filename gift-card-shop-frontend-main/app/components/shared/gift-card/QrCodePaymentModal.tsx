import QRCode from 'react-qr-code';
import Logo from '~/assets/images/Kimscard-Logo.png';
import { CloseIcon } from '~/constants/icons';
import { useFetch } from '~/hooks/useFetch';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';

type Props = {
    show: boolean;
    onClose: () => void;
    control: any;
    orderId: string;
    network: string;
    onSuccess: (data: any) => void;
};

export default function QrCodePaymentModal(props: Props) {
    const qrCodeModalRef = useOutsideClick<HTMLDivElement>(() => props.onClose());

    const { data: order, refetch } = useFetch<{ data: Order }>(
        props.orderId ? `/order/${props.orderId}` : null,
        undefined,
        async data => {
            if (data?.data?.nowPaymentStatus !== 'finished') {
                await new Promise(resolve => setTimeout(resolve, 4000));
                refetch();
            } else if (data?.data?.nowPaymentStatus === 'finished') {
                props.onSuccess(data?.data);
                props.onClose();
            }
        }
    );

    const { data } = useFetch<{ message: String; data: Order }>(
        props.orderId && props.network && props.show ? '/order/payment-url' : null,
        {
            params: { orderId: props.orderId, network: props.network },
        },
        () => {
            refetch();
        }
    );

    const renederPaymentStatus = () => {
        const Div = ({ Icon, text }: { Icon?: string; text: string }) => {
            return (
                <div className="flex items-center gap-3">
                    {Icon || <Loader />}
                    <p className="p-md font-medium text-center">{text}</p>
                </div>
            );
        };

        switch (order?.data?.nowPaymentStatus) {
            case 'waiting':
                return <Div text="Waiting for your payment" />;
            case 'confirming':
            case 'confirmed':
                return <Div text="We have received your payment. Confirming..." />;
            case 'sending':
                return <Div text="Processing your order. Please wait..." />;

            case 'finished':
                return <Div Icon="✅" text="Payment successful! Your order is complete." />;

            case 'failed':
                return <Div Icon="❌" text="Payment failed. Please try again." />;

            case 'refunded':
                return <Div Icon="🔄" text="Your payment has been refunded." />;

            case 'expired':
                return <Div Icon="" text="The payment session has expired." />;

            default:
                return '';
        }
    };

    console.log('QR Code Payment Modal Rendered with order:', order);
    console.log('Payment URL Data:', data);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[#04080F]/50 transition-transform duration-300 ${props.show ? 'block' : 'hidden'}`}
        >
            <div
                className="rounded-lg min-w-full min-h-full bg-surface-50 border border-primary-500"
                ref={qrCodeModalRef}
            >
                <div className="relative flex flex-col gap-6 rounded-lg p-4 lg:p-5 scrollbar-hide">
                    <div className="flex flex-col items-center justify-center gap-6 lg:gap-12">
                        <div className="flex items-center justify-center h-16">
                            <img
                                src={Logo}
                                alt="Logo_of_Gift_card"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="w-full border border-primary-200 rounded-lg p-3 lg:p-10 flex flex-col gap-8">
                            <div className="flex flex-col items-center justify-center gap-5">
                                <QRCode
                                    value={
                                        data?.data?.qrCodeText ||
                                        'Payment URL not available now. Please wait...'
                                    }
                                    className="size-[350px]"
                                />
                                <p className="p-md font-medium text-center">
                                    Please scan this Qr code to finish the payment
                                </p>

                                {renederPaymentStatus()}
                            </div>

                            <Input
                                name="totalAmount"
                                control={props.control}
                                label="Total Amount"
                                placeholder="Enter amount"
                                rules={{ required: 'Total amount is required' }}
                                icon={<span>USDT</span>}
                                disabled
                            />

                            <Button title="Back" variant="ghost" onClick={props.onClose} />
                        </div>
                    </div>

                    <CloseIcon
                        className="cursor-pointer text-primary-500 absolute top-[20px] right-[20px]"
                        onClick={props.onClose}
                    />
                </div>
            </div>
        </div>
    );
}
