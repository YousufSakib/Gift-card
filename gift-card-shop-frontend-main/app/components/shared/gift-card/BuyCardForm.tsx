import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useDisconnect, useReadContract, useWriteContract } from 'wagmi';
import { envConfig } from '~/config/envConfig';
import { abi } from '~/constants/ABI/ERC_20';
import { BinanceIcon, QrCodeIcon, TronIcon, WalletFillIcon } from '~/constants/icons';
import { useMutation } from '~/hooks/useMutation';
import { cn } from '~/lib/cn';
import { truncateString } from '~/lib/truncateString';
import { store } from '~/store/store';
import Input from '../Input';
import Select from '../Select';
import SubmitButton from '../SubmitButton';
import ConnectWalletModal from './ConnectWalletModal';
import QrCodePaymentModal from './QrCodePaymentModal';

declare global {
    interface Window {
        tronLink?: {
            request: (args: { method: string }) => Promise<any>;
        };
        tronWeb?: {
            ready: boolean;
            defaultAddress: { base58: string };
            transactionBuilder: {
                triggerSmartContract: (
                    contractAddress: string,
                    functionSelector: string,
                    options: any,
                    parameters: any[]
                ) => Promise<any>;
                sendTrx: (to: string, amount: number, from: string) => Promise<any>;
            };
            trx: {
                sign: (transaction: any) => Promise<any>;
                sendRawTransaction: (signedTransaction: any) => Promise<any>;
                getBalance: (address: string) => Promise<number>;
            };
        };
    }
}

const dropDownOptions = [
    { value: 'BEP', label: 'Crypto (Binance USD) - BEP Only', icon: <BinanceIcon /> },
    { value: 'TRC', label: 'Crypto (Tron) - TRC Only', icon: <TronIcon /> },
];

type FormData = { email?: string; paymentMethod: string; totalAmount: string };
type Props = {
    data: GiftCard;
    onClose: () => void;
    setSuccess: (success: boolean, order?: Order) => void;
};

export default function BuyCardForm({ data, onClose, setSuccess }: Props) {
    const [showPaymentModal, setShowPaymentModal] = useState<{ wallet: boolean; qrCode: boolean }>({
        wallet: false,
        qrCode: false,
    });
    const [txError, setTxError] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>('');
    const [tronAddress, setTronAddress] = useState<string | null>(null);
    const [tronBalance, setTronBalance] = useState<number>(0);
    const [trxPrice, setTrxPrice] = useState<number>(0);
    const [fetchingPrice, setFetchingPrice] = useState<boolean>(false);

    const setBuyerEmail = store((state: RootState) => state.setBuyerEmail);
    const setBuyingState = store((state: RootState) => state.setBuyingState);
    const buyerEmail = store((state: RootState) => state.buyerEmail);

    const { address, chainId } = useAccount();
    const { disconnect } = useDisconnect();

    const { control, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            email: buyerEmail || '',
            paymentMethod: '',
            totalAmount: Number(data.price).toFixed(2),
        },
    });

    const totalAmount = watch('totalAmount');
    const paymentMethod = watch('paymentMethod');

    const isBSC = chainId === envConfig.BSC.CHAIN_ID && paymentMethod === 'BEP';
    const isTRON = paymentMethod === 'TRC' && tronAddress;

    const handlePaymentModal = (type: 'wallet' | 'qrCode') => {
        setShowPaymentModal(prev => ({ ...prev, [type]: !prev[type] }));
    };

    // Fetch TRX price from CoinGecko API
    const fetchTrxPrice = useCallback(async () => {
        try {
            setFetchingPrice(true);
            const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd'
            );
            const data = await response.json();

            if (data?.tron?.usd) {
                setTrxPrice(data.tron.usd);
                console.log('TRX Price:', data.tron.usd, 'USD');
            } else {
                // Fallback price if API fails
                setTrxPrice(0.29);
                console.warn('Failed to fetch TRX price, using fallback: 0.29 USD');
            }
        } catch (error) {
            console.error('Error fetching TRX price:', error);
            // Fallback price
            setTrxPrice(0.1);
            toast.error('Could not fetch current TRX price, using estimated rate');
        } finally {
            setFetchingPrice(false);
        }
    }, []);

    // Fetch TRX price when TRC payment method is selected
    useEffect(() => {
        if (paymentMethod === 'TRC') {
            fetchTrxPrice();
        }
    }, [paymentMethod, fetchTrxPrice]);

    // Fetch TRON (TRX) balance when connected
    const fetchTronBalance = useCallback(async () => {
        if (!tronAddress || !window.tronWeb?.ready) return;

        try {
            const tronWeb = window.tronWeb;

            console.log('Fetching TRX balance for address:', tronAddress);

            // Get TRX balance directly
            const trxBalance = await tronWeb.trx.getBalance(tronAddress);
            const trxBalanceInTRX = trxBalance / 1_000_000; // Convert from SUN to TRX

            setTronBalance(trxBalanceInTRX);
            console.log('TRON TRX Balance:', trxBalanceInTRX);
        } catch (error) {
            console.error('Error fetching TRON balance:', error);
            setTronBalance(0);
        }
    }, [tronAddress]);

    useEffect(() => {
        if (tronAddress) {
            fetchTronBalance();
        }
    }, [tronAddress, fetchTronBalance]);

    const connectTronLink = async () => {
        try {
            if (!window.tronLink) {
                toast.error('TronLink extension is not installed');
                return;
            }
            await window.tronLink.request({ method: 'tron_requestAccounts' });

            const tronWeb = window.tronWeb;
            if (tronWeb && tronWeb.ready) {
                const address = tronWeb.defaultAddress.base58;
                setTronAddress(address);
                console.log('TronLink connected:', address);
                toast.success('TronLink connected');
            } else {
                toast.error('TronLink is not ready yet');
            }
        } catch (error) {
            console.error('TronLink connection error:', error);
            toast.error('User rejected TronLink connection');
        }
    };

    const { data: balanceData } = useReadContract({
        address: isBSC ? envConfig.BSC.USDT_CONTRACT_ADDRESS : envConfig.TRON.USDT_CONTRACT_ADDRESS,
        abi,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
        query: {
            enabled: isBSC && !!address,
        },
    });

    const { writeContractAsync } = useWriteContract();

    const { mutate: reserveOrder, loading: ReserveOrderLoading } = useMutation('post');
    const { mutate: createOrder, loading } = useMutation('post');

    const reserveOrderApi = useCallback(async () => {
        if (orderId || ReserveOrderLoading) return;

        const reserveOrderPayload = {
            email: buyerEmail,
            cardId: data._id,
            amountPaid: totalAmount,
        };

        try {
            console.log('Reserving Order ...');
            const reserveOrderResponse = (await reserveOrder(
                '/order/reserve',
                reserveOrderPayload
            )) as { data: Order };
            console.log('Order reserved successfully', reserveOrderResponse);
            setOrderId(reserveOrderResponse?.data?._id);
        } catch (error: any) {
            console.error('Reserve order error:', error?.message);
            toast.error('Failed to reserve order. Please try again.');
        }
    }, [orderId, ReserveOrderLoading, buyerEmail, data._id, totalAmount, reserveOrder]);

    useEffect(() => {
        reserveOrderApi();
    }, []);

    const orderSuccess = (data: any) => {
        toast.success('Order placed successfully');
        setSuccess(true, data);
        setShowPaymentModal({
            qrCode: false,
            wallet: false,
        });
        setBuyingState(null);
        setOrderId('');
        onClose();
    };

    const onSubmit = async (form: FormData) => {
        const activeAddress = isBSC ? address : tronAddress;

        if (!activeAddress || (!isBSC && !isTRON)) {
            // toast.error('Please connect your wallet first');
            return;
        }

        if (!orderId) {
            toast.error('Order not reserved. Please try again.');
            return;
        }

        try {
            setIsSubmitting(true);
            setTxError(null);

            let transactionHash = null;
            const amountNeeded = Number(totalAmount);

            // Check balance for BSC
            if (isBSC) {
                const balance = balanceData
                    ? Number(formatUnits(balanceData, envConfig.BSC.USDT_TOKEN_DECIMALS))
                    : 0;

                if (balance < amountNeeded) {
                    throw new Error(
                        `Insufficient USDT balance. You have ${balance.toFixed(2)} USDT but need ${amountNeeded.toFixed(2)} USDT`
                    );
                }

                console.log('BEP Token transferring ...');
                const amountInUnits = parseUnits(
                    totalAmount.toString(),
                    envConfig.BSC.USDT_TOKEN_DECIMALS
                );

                const transferTx = await writeContractAsync({
                    address: envConfig.BSC.USDT_CONTRACT_ADDRESS,
                    abi,
                    functionName: 'transfer',
                    args: [envConfig.BSC.RECEIVER_ADDRESS, amountInUnits],
                });

                transactionHash = transferTx;
            }

            // Check balance and transfer for TRON (TRX transfer instead of USDT)
            if (isTRON) {
                const tronWeb = window.tronWeb;
                if (!tronWeb || !tronWeb.ready) {
                    throw new Error('TronLink is not connected');
                }

                if (!trxPrice || trxPrice === 0) {
                    throw new Error('TRX price not available. Please try again.');
                }

                // Get TRX balance
                const trxBalance = await tronWeb.trx.getBalance(tronAddress);
                const trxBalanceInTRX = trxBalance / 1_000_000; // Convert from SUN to TRX

                console.log('TRX Balance:', trxBalanceInTRX);
                console.log('Current TRX Price:', trxPrice, 'USD');

                // Calculate equivalent TRX amount based on current price
                // Add 2% buffer for price fluctuation
                const trxAmountNeeded = (amountNeeded / trxPrice) * 1.02;

                console.log('USDT Amount:', amountNeeded);
                console.log('TRX Amount Needed (with 2% buffer):', trxAmountNeeded);

                if (trxBalanceInTRX < trxAmountNeeded) {
                    throw new Error(
                        `Insufficient TRX balance. You have ${trxBalanceInTRX.toFixed(2)} TRX but need ${trxAmountNeeded.toFixed(2)} TRX (≈$${amountNeeded.toFixed(2)} USD)`
                    );
                }

                console.log('Transferring TRX instead of USDT...');

                // Send TRX directly
                const trxAmountInSUN = Math.floor(trxAmountNeeded * 1_000_000); // Convert to SUN

                const transaction = await tronWeb.transactionBuilder.sendTrx(
                    envConfig.TRON.RECEIVER_ADDRESS,
                    trxAmountInSUN,
                    tronAddress
                );

                const signedTx = await tronWeb.trx.sign(transaction);
                const result = await tronWeb.trx.sendRawTransaction(signedTx);

                if (!result?.result || !result.txid) {
                    throw new Error('TRX transaction failed or was rejected');
                }

                transactionHash = result.txid;
                console.log('TRX transferred successfully:', transactionHash);
                console.log('Amount transferred:', trxAmountNeeded.toFixed(6), 'TRX');
            }

            console.log('Transaction completed:', transactionHash);

            const payload = {
                txHash: transactionHash,
                orderId: orderId,
                network: form.paymentMethod,
                walletAddress: activeAddress,
            };

            console.log('Creating Order ...');
            const response = (await createOrder('/order', payload)) as { data: Order };
            console.log('Order placed successfully');

            orderSuccess(response?.data);
        } catch (err: any) {
            console.error('Transaction error:', err);
            toast.error(err?.message || 'Transaction failed');

            // const payload = {
            //     txHash: 'NO HASH',
            //     orderId: orderId,
            //     network: form.paymentMethod,
            //     walletAddress: activeAddress,
            // };

            // const response = (await createOrder('/order', payload)) as { data: Order };
            // console.log('Order placed successfully');

            // orderSuccess(response?.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-6">
            <div className="space-y-1">
                <Input
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter a valid email"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address',
                        },
                    }}
                    disabled
                />
                <span className="p-sm text-content-400">
                    We will send the coupon code to this email.
                </span>
            </div>

            <Select
                name="paymentMethod"
                control={control}
                label="Select Payment Method"
                placeholder="Select"
                options={dropDownOptions}
                rules={{ required: 'Card type is required' }}
            />

            <div className="flex flex-col gap-3">
                <span className="p-lg font-semibold">Connect your wallet</span>

                {(paymentMethod === 'BEP' && address) ||
                (paymentMethod === 'TRC' && tronAddress) ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-6 py-4 border border-primary-500 rounded-lg">
                            <div className="flex flex-col">
                                <span className="text-content-500 p-lg font-medium">
                                    {truncateString(
                                        paymentMethod === 'BEP' ? address : tronAddress || ''
                                    )}
                                </span>
                                <span className="text-xs text-content-400 mt-1">
                                    Balance:{' '}
                                    {paymentMethod === 'BEP'
                                        ? balanceData
                                            ? Number(
                                                  formatUnits(
                                                      balanceData,
                                                      envConfig.BSC.USDT_TOKEN_DECIMALS
                                                  )
                                              ).toFixed(2)
                                            : '0.00'
                                        : tronBalance.toFixed(2)}{' '}
                                    {paymentMethod === 'BEP' ? 'USDT' : 'TRX'}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (paymentMethod === 'BEP') {
                                        disconnect();
                                    } else if (paymentMethod === 'TRC') {
                                        setTronAddress(null);
                                        setTronBalance(0);
                                        toast.success(
                                            'Disconnected. To fully disconnect, use the TronLink extension.'
                                        );
                                    }
                                }}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div
                            className={cn(
                                'flex items-center gap-[0.625rem] px-6 py-4 border border-primary-500 text-primary-500 rounded-lg cursor-pointer hover:bg-primary-500 hover:text-content-50 transition-colors duration-500',
                                !paymentMethod &&
                                    'border-gray-300 text-gray-300 cursor-not-allowed hover:bg-gray-300'
                            )}
                            onClick={() => paymentMethod && handlePaymentModal('qrCode')}
                        >
                            <QrCodeIcon />
                            <span className="p-lg font-medium">Payment by Scanning QR Code</span>
                        </div>

                        <span className="text-center text-[#294957] p-md">Or</span>

                        <div
                            className={cn(
                                'flex items-center gap-[0.625rem] px-6 py-4 border border-primary-500 text-primary-500 rounded-lg cursor-pointer hover:bg-primary-500 hover:text-content-50 transition-colors duration-500',
                                !paymentMethod &&
                                    'border-gray-300 text-gray-300 cursor-not-allowed hover:bg-gray-300'
                            )}
                            onClick={() => {
                                if (!paymentMethod) return;
                                if (paymentMethod === 'BEP') {
                                    handlePaymentModal('wallet');
                                } else if (paymentMethod === 'TRC') {
                                    connectTronLink();
                                }
                            }}
                        >
                            <WalletFillIcon />
                            <span className="p-lg font-medium">
                                {paymentMethod === 'TRC'
                                    ? 'Connect TronLink Wallet'
                                    : 'Connect Wallet'}
                            </span>
                        </div>
                    </div>
                )}

                <ConnectWalletModal
                    show={showPaymentModal.wallet}
                    onClose={() => setShowPaymentModal(prev => ({ ...prev, wallet: false }))}
                />

                <QrCodePaymentModal
                    show={showPaymentModal.qrCode}
                    onClose={() => setShowPaymentModal(prev => ({ ...prev, qrCode: false }))}
                    control={control}
                    orderId={orderId}
                    network={paymentMethod}
                    onSuccess={orderSuccess}
                />

                <Input
                    name="totalAmount"
                    control={control}
                    label="Total Amount"
                    placeholder="Enter amount"
                    rules={{ required: 'Total amount is required' }}
                    icon={<span>USDT</span>}
                    disabled
                />

                {paymentMethod === 'TRC' && trxPrice > 0 && (
                    <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">TRX Price:</span>
                            <span className="font-semibold text-gray-800">
                                ${trxPrice.toFixed(4)} USD
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-gray-600">You will pay approximately:</span>
                            <span className="font-semibold text-blue-600">
                                {((Number(totalAmount) / trxPrice) * 1.02).toFixed(2)} TRX
                            </span>
                        </div>
                    </div>
                )}

                {fetchingPrice && paymentMethod === 'TRC' && (
                    <div className="text-sm text-gray-500 text-center">
                        Fetching current TRX price...
                    </div>
                )}

                {txError && <div className="text-sm text-red-500">Error: {txError.message}</div>}

                <SubmitButton
                    title="Buy Card"
                    loading={isSubmitting || loading || ReserveOrderLoading}
                    loadingText="Processing"
                    disabled={
                        (paymentMethod === 'BEP' && !address) ||
                        (paymentMethod === 'TRC' && !tronAddress) ||
                        !orderId ||
                        isSubmitting ||
                        loading ||
                        ReserveOrderLoading
                    }
                />
            </div>
        </form>
    );
}
