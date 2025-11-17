import { dateFormat } from '~/lib/dateFormat';

export type GiftCardTable = {
    productCode: string;
    giftCard: {
        image: string;
        title: string;
    };
    cardValue: string;
    date: string | undefined;
    price: string;
    stockCount: number;
    status: 'ACTIVE' | 'INACTIVE';
    description?: string;
    cardCode?: string[];
    soldCards?: string[];
};

const giftCardTableColumns: TableColumn[] = [
    {
        key: 'productCode',
        label: 'Product Code',
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
        key: 'date',
        label: 'Date',
    },
    {
        key: 'price',
        label: 'Price (USDT)',
    },
    {
        key: 'stockCount',
        label: 'Stock Count',
    },
    {
        key: 'status',
        label: 'Status',
    },
];

const mapGiftCardsToTableData = (giftCards: GiftCard[]): GiftCardTable[] => {
    return giftCards?.map(giftCard => ({
        productCode: `#${giftCard?._id}`,
        giftCard: { image: giftCard?.image, title: giftCard?.name },
        cardValue: `$${giftCard?.cardValue}`,
        date: dateFormat(giftCard?.createdAt),
        price: giftCard?.price?.toFixed(2),
        stockCount: giftCard?.cardCode?.length,
        status: giftCard?.status ? 'ACTIVE' : 'INACTIVE',
        description: giftCard?.description,
        cardCode: giftCard?.cardCode,
        soldCards: giftCard?.soldCards,
    }));
};

const giftCardStatusOptions: TableStatsuOption[] = [
    { label: 'ACTIVE', color: 'bg-green-500' },
    { label: 'INACTIVE', color: 'bg-red-500' },
];

export { giftCardTableColumns, mapGiftCardsToTableData, giftCardStatusOptions };
