import { Link } from 'react-router';
import Divider from '~/components/shared/Divider';
import { envConfig } from '~/config/envConfig';
import { EditIcon } from '~/constants/icons';
import type { GiftCardTable } from '~/constants/tables/guftCardTable';
import { cn } from '~/lib/cn';
import { dateFormat } from '~/lib/dateFormat';

type Props = { giftCard: GiftCardTable };

const statusOptions = [
    { label: 'sold', color: 'bg-red-500' },
    { label: 'available', color: 'bg-green-500' },
];

export default function GiftCardDetails({ giftCard }: Props) {
    const availableCodes =
        giftCard?.cardCode?.map(code => ({ code: code, status: 'available' })) || [];
    const soldCodes = giftCard?.soldCards?.map(code => ({ code: code, status: 'sold' })) || [];

    const productCodes = [...availableCodes, ...soldCodes];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <div className="flex flex-col gap-2">
                    <span className="p-lg">
                        Product id: <span className="font-semibold">{giftCard.productCode}</span>
                    </span>
                    <span className="p-md">Date: {dateFormat(giftCard.date)}</span>
                </div>

                <Link
                    to={`/admin/gift-cards/edit/${giftCard.productCode.replace('#', '')}`}
                    className="bg-surface-50 p-1 text-primary-500"
                >
                    <EditIcon />
                </Link>
            </div>

            <div className="size-[6.25rem]">
                <img
                    src={`${envConfig.API_BASE_URL}/${giftCard.giftCard.image}`}
                    alt={`${giftCard.giftCard.title}`}
                    title={`${giftCard.giftCard.title}`}
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex flex-col gap-3">
                <h4>{giftCard.giftCard.title}</h4>
                <span className="p-md">{giftCard.description}</span>
            </div>

            <Divider className="bg-surface-600" />

            <div className="flex gap-6">
                <div className="flex flex-col gap-3">
                    <span className="p-md text-content-400">Value</span>
                    <h4 className="font-semibold">
                        ${' '}
                        <span className="text-primary-500">
                            {giftCard.cardValue.replace('$', '')}
                        </span>
                    </h4>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="p-md text-content-400">Price</span>
                    <h4 className="font-semibold">
                        USDT <span className="text-primary-500">{giftCard.price}</span>
                    </h4>
                </div>
            </div>

            <Divider className="bg-surface-600" />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="p-lg text-content-400">Stock Count</span>
                    <h4>{giftCard?.stockCount}</h4>
                </div>

                <div className="flex items-center gap-2">
                    <span className="p-lg text-content-400">Status</span>
                    <span
                        className={cn(
                            'p-md caption',
                            giftCard.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'
                        )}
                    >
                        {giftCard.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            <Divider className="bg-surface-600" />

            <div className="flex flex-col gap-4">
                <span className="p-lg font-semibold">Gift card code</span>

                {productCodes?.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-[4rem] overline-1">{index + 1}</div>
                        <div className="flex-1 overline-1">{item.code}</div>
                        <div className="flex-1">
                            <div className="w-fit flex items-center gap-2 p-2 rounded-lg bg-surface-50">
                                {/* Circle Indicator Before the Value */}
                                <span
                                    className={cn(
                                        'w-3 h-3 rounded-full',
                                        statusOptions?.find(
                                            option =>
                                                option.label.toLowerCase() ===
                                                item.status?.toLowerCase()
                                        )?.color || 'bg-gray-500'
                                    )}
                                />
                                <span className="capitalize overline-2">{item.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
