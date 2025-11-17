import type { Control } from 'react-hook-form';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import Divider from '~/components/shared/Divider';
import Select from '~/components/shared/Select';
import { IncreaseIcon } from '~/constants/icons';

type IncomeOverviewStatisticsProps = {
    summary: OrderSummary | null;
    incomeBreakdown: IncomeOverview[] | null;
    control: Control<any>;
};

const addressOptions = [
    { value: 'last15days', label: 'Last 15 days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
];

const CustomBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    const minHeight = 15;
    const finalHeight = height === 0 ? minHeight : height;
    const finalY = height === 0 ? y - minHeight : y;
    return (
        <foreignObject x={x} y={finalY} width={width} height={finalHeight}>
            <div
                style={{
                    backgroundColor: fill,
                    height: `${finalHeight}px`,
                    width: `${width}px`,
                    borderRadius: '30px',
                    margin: '0 auto',
                }}
            />
        </foreignObject>
    );
};

const IncomeOverviewStatistics = (props: IncomeOverviewStatisticsProps) => {
    const { summary, incomeBreakdown, control } = props;

    const transformedIncomeBreakdown = incomeBreakdown?.map(item => ({
        sl: item.date.split('-')[2],
        totalIncome: item.totalIncome,
    }));

    return (
        <div className="col-span-2 bg-surface-300 p-5 rounded-xl inline-flex flex-col justify-between items-start">
            <div className="w-full h-full space-y-5">
                <div className="flex justify-between gap-4">
                    <div className="inline-flex flex-col justify-start items-start gap-3">
                        <div className="justify-start text-content-400 p-md">Income Overview</div>
                        <div className="self-stretch inline-flex justify-start items-start gap-2">
                            <h4 className="justify-start text-content-500 font-semibold">USDT</h4>
                            <div className="inline-flex flex-col justify-center items-start gap-0.5">
                                <h4 className="justify-start text-primary-500 font-semibold">
                                    {summary?.totalIncome?.toFixed(2)}
                                </h4>
                                <div className="inline-flex justify-start items-center gap-1">
                                    <div className="w-4 h-4 relative overflow-hidden">
                                        <IncreaseIcon
                                            className={`${summary?.incomeChangePercent && summary?.incomeChangePercent > 0 ? 'text-green-500' : 'text-red-500 rotate-180'}`}
                                        />
                                    </div>
                                    <div className="justify-start overline-1 text-content-400 w-full">
                                        {summary?.incomeChangePercent?.toFixed(2)}% Last Month
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Select control={control} name="dateFilter" options={addressOptions} />
                </div>

                <Divider className="bg-surface-600" />

                <div className="w-full h-[18.75rem]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={transformedIncomeBreakdown} barCategoryGap="20%">
                            <XAxis
                                dataKey="sl"
                                tick={{ fill: '#b1bcba' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }} />
                            <Bar
                                dataKey="totalIncome"
                                fill="#d95c19"
                                shape={<CustomBar fill="#d95c19" />}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default IncomeOverviewStatistics;
