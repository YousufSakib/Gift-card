import { TronIcon, BinanceIcon } from '~/constants/icons';
import { dateFormat } from '~/lib/dateFormat';
import { truncateString } from '~/lib/truncateString';

export type OrderTable = {
    sl: number;
    txId: string;
    email: string;
    giftCard: {
        image: string;
        title: string;
    };
    cardValue: string;
    code: string;
    date: string | undefined;
    totalPrice: string;
    paymentMethod: {
        icon: React.ReactNode;
        title: string;
    };
};

const orderTableColumns: TableColumn[] = [
    {
        key: 'sl',
        label: 'SL no.',
    },
    {
        key: 'txId',
        label: 'TXID',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'giftCard',
        label: 'Gift Card',
        type: 'object',
    },
    {
        key: 'cardValue',
        label: 'Card Value',
    },
    {
        key: 'code',
        label: 'Code',
    },
    {
        key: 'date',
        label: 'Date',
    },
    {
        key: 'totalPrice',
        label: 'Total Price (USDT)',
    },
    {
        key: 'paymentMethod',
        label: 'Payment Method',
        type: 'object',
    },
];

const mapOrdersToTableData = (orders: Order[], currentPage: number = 1): OrderTable[] => {
    return orders?.map((order, index) => ({
        sl: index + 1 + (currentPage - 1) * 10,
        txId: `#${truncateString(order?.txHash)}`,
        email: order?.email,
        giftCard: { image: order?.card?.image, title: order?.card?.name },
        cardValue: `$${order?.card?.cardValue}`,
        code: order?.cardCode,
        date: dateFormat(order?.createdAt),
        totalPrice: order?.amountPaid?.toFixed(2),
        paymentMethod: {
            icon: order?.network === 'TRC' ? <TronIcon /> : <BinanceIcon />,
            title: order?.network === 'TRC' ? 'Tron USD' : 'Binance USD',
        },
    }));
};

export { orderTableColumns, mapOrdersToTableData };
