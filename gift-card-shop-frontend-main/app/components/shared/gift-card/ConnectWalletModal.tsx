import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import {
    BitcoinIcon,
    CloseIcon,
    CoinbaseIcon,
    MetaMaskIcon,
    PhantomIcon,
    WalletConnectIcon,
} from '~/constants/icons';
import { useOutsideClick } from '~/hooks/useOutsideClick';

type Props = { show: boolean; onClose: () => void };

const icons = {
    Injected: <BitcoinIcon />,
    WalletConnect: <WalletConnectIcon />,
    MetaMask: <MetaMaskIcon />,
    Phantom: <PhantomIcon />,
};

export default function ConnectWalletModal(props: Props) {
    const walletOptionRef = useOutsideClick<HTMLDivElement>(() => props.onClose());
    const { connectors, connect } = useConnect();
    const { address } = useAccount();

    useEffect(() => {
        if (address) {
            console.log('Closing walltetModal');
            props.onClose();
        }
    }, [address]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[#04080F]/50 transition-transform duration-300 ${props.show ? 'scale-100' : 'scale-0'}`}
        >
            <div
                className="rounded-lg flex justify-center items-center p-[1px] bg-surface-500 border border-primary-500"
                ref={walletOptionRef}
            >
                <div className="relative lg:min-w-[37.25rem] flex flex-col w-full gap-6 lg:gap-[50px] px-[1rem] lg:px-[2.5rem] py-[2.5rem] text-center rounded-lg p-10">
                    <div className="flex justify-between items-center gap-6 text-content-500">
                        <h4 className="text-xl lg:text-2xl font-semibold">
                            Connect to Your Wallet
                        </h4>
                        <CloseIcon className="cursor-pointer" onClick={props.onClose} />
                    </div>

                    <ul className="flex flex-col gap-2 lg:gap-5">
                        {connectors
                            .filter(c => c.name.toLowerCase() !== 'safe')
                            .map(connector => (
                                <li
                                    key={connector.uid}
                                    onClick={() => connect({ connector })}
                                    className="border border-primary-500 hover:bg-primary-500 hover:text-content-50 transition-colors duration-500 rounded-lg px-6 py-4 flex items-center gap-4 cursor-pointer"
                                >
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        {icons[connector.name as keyof typeof icons]}
                                    </div>
                                    <h5 className="font-medium">{connector.name}</h5>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
