import { Link } from 'react-router';
import { SuccessIcon } from '~/constants/icons';
import Button from './Button';
import Modal from './Modal';
type Props = { show: boolean; onClose: () => void; };

export default function SuccessfulPasswordChangeModal(props: Props) {
    return (
        <Modal show={props.show} onClose={props.onClose} height="h-fit" width="lg:w-[40%]">
            <div className="flex flex-col items-center justify-center gap-8 text-center p-10">
                <div className="flex flex-col items-center justify-center gap-8">
                    <SuccessIcon className="size-[100px] lg:size-[150px]" />
                    <div className="text-center justify-start flex flex-col gap-2">
                        <span className="text-gray-900 text-[32px] font-semibold font-oswald leading-[43px]">Password Reset</span>
                        <span className="text-[#00c85f] text-[32px] font-semibold font-oswald leading-[43px]">Successful</span></div>
                </div>

                <p className="p-sm lg:p-lg text-content-400">
                    Your password has been updated. Return to the sign in menu and sign in to your account with your new credentials.
                </p>

                {/* <Link to="/admin"> */}
                    <Button onClick={props.onClose} title="Back to sign in" />
                {/* </Link> */}
            </div>
        </Modal>
    );
}
