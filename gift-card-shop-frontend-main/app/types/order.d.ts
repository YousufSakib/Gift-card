type OrderSummary = {
    totalOrders: number;
    totalIncome: number;
    totalCards: number;
    incomeChangePercent: number;
};

type IncomeOverview = {
    date: string;
    totalIncome: number;
};

type NowPaymentStatus =
    | 'waiting'
    | 'confirming'
    | 'confirmed'
    | 'sending'
    | 'finished'
    | 'failed'
    | 'refunded'
    | 'expired';

type Order = TimeStamp & {
    _id: string;
    txHash: string;
    email: string;
    walletAddress: string;
    amountPaid: number;
    network: string;
    cardCode: string;
    card: {
        _id: string;
        name: string;
        image: string;
        cardValue: number;
        price: number;
    };
    paymentUrl: string;
    qrCodeText: string;
    nowPaymentStatus: NowPaymentStatus;
};
