import { ArrowUpDiagonalIcon } from '~/constants/icons';
import Divider from '../Divider';
import { Link } from 'react-router';
import { cn } from '~/lib/cn';

type Props = {
    showDetails?: boolean;
    title: string;
    total: string;
    icon: React.ReactNode;
    showCurrency?: boolean;
    className?: string;
};

export default function OrderSummaryCard({
    showDetails = true,
    title,
    total,
    icon,
    showCurrency,
    className,
}: Props) {
    return (
        <div
            className={cn(
                'bg-surface-300 rounded-xl inline-flex flex-col justify-between items-start',
                showDetails ? 'p-5' : 'p-8',
                className
            )}
        >
            <div
                className={cn(
                    'self-stretch inline-flex justify-between',
                    showDetails ? 'items-start' : 'items-center'
                )}
            >
                <div className="inline-flex flex-col justify-center items-start gap-2">
                    <div className="text-right justify-center p-lg font-medium">{title}</div>
                    <h1 className="text-right justify-center text-primary-500 font-oswald">
                        {total}{' '}
                        {showCurrency && (
                            <span className="text-content-500 p-sm font-poppins">USDT</span>
                        )}
                    </h1>
                </div>

                {icon}
            </div>

            {showDetails && (
                <>
                    <Divider className="bg-surface-600" />

                    <Link
                        to="/admin/gift-cards"
                        className="self-stretch px-4 py-2 rounded-[36px] inline-flex justify-between items-center overflow-hidden"
                    >
                        <div className="text-center justify-start text-base font-medium font-['Poppins'] leading-tight">
                            Details
                        </div>
                        <div className="relative overflow-hidden">
                            <ArrowUpDiagonalIcon className="text-primary-500" />
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
}
