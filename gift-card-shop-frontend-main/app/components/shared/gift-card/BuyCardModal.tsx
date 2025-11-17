import { useState } from 'react';
import Logo from '~/assets/images/Kimscard-Logo.png';
import { store } from '~/store/store';
import Modal from '../Modal';
import BuyCardForm from './BuyCardForm';
import BuyerEmailForm from './BuyerEmailForm';
import OTPVerificationForm from './OTPVerificationForm';
import PaymentFailedModal from './PaymentFailedModal';
import SuccessfullPurchaseModal from './SuccessfullPurchaseModal';

type Props = { show: boolean; onClose: () => void; data: GiftCard };

export default function BuyCardModal(props: Props) {
    const [orderStatus, setOrderStatus] = useState<'success' | 'failed' | null>(null);
    const [order, setOrder] = useState<Order | null>(null);

    const buyingState = store((state: RootState) => state.buyingState);

    const renderModalContent = () => {
        switch (buyingState) {
            case 'verified':
                return (
                    <BuyCardForm
                        data={props.data}
                        onClose={props.onClose}
                        setSuccess={(success: boolean, order?: Order) => {
                            setOrderStatus(success ? 'success' : 'failed');
                            if (order) setOrder(order);
                        }}
                    />
                );
            case 'otp':
                return <OTPVerificationForm />;
            default:
                return <BuyerEmailForm />;
        }
    };

    return (
        <>
            <Modal
                show={props.show}
                onClose={props.onClose}
                height="h-full lg:h-fit"
                width="w-[100%] lg:max-w-[44.4375rem]"
            >
                <div className="h-full flex flex-col items-center justify-center gap-6 lg:gap-12">
                    <div className="flex items-center justify-center h-16">
                        <img
                            src={Logo}
                            alt="Logo_of_Gift_card"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="w-full border border-primary-200 rounded-lg p-3 lg:p-10">
                        {renderModalContent()}
                    </div>
                </div>

                <PaymentFailedModal
                    show={orderStatus === 'failed'}
                    onClose={() => setOrderStatus(null)}
                />
            </Modal>

            <SuccessfullPurchaseModal
                show={orderStatus === 'success'}
                onClose={() => setOrderStatus(null)}
                order={order}
            />
        </>
    );
}
