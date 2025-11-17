import React from 'react';
import { cn } from '~/lib/cn';
// import CheckIcon from '@/assets/Icons/check.svg';
// import CloseIcon from '@/assets/Icons/close.svg';
import TableStatusDropdown from './TableStatusDropdown';
import { envConfig } from '~/config/envConfig';
import { DeleteIcon, EditIcon, EyeIcon } from '~/constants/icons';

interface TableProps<T> {
    columns: TableColumn[];
    data: T[];
    actions?: TableAction<T>[];
    statusDropdown?: boolean;
    onStatusChange?: (row: T, newStatus: string) => void;
    statusOptions?: TableStatsuOption[];
    select?: {
        selectedRows?: T[];
        onSelect: (rows: T[]) => void;
        getRowId: (row: T) => string;
    };
}

const renderObjectData = (
    data: {
        image?: string;
        icon?: React.ReactNode;
        title: string;
    },
    rounded: boolean = false
) => {
    return (
        <div className="flex items-center gap-2">
            {data?.icon ? (
                data?.icon
            ) : (
                <div className="size-[2.9375rem]">
                    <img
                        src={`${envConfig.API_BASE_URL}/${data?.image}`}
                        alt={data?.title}
                        className="w-full h-full object-contain"
                    />
                </div>
            )}

            <div className="flex flex-col gap-1">
                <span className="overline-1 font-medium">{data?.title}</span>
            </div>
        </div>
    );
};

const Table = <T,>({
    columns,
    data,
    actions,
    statusDropdown = false,
    onStatusChange,
    statusOptions,
    select,
}: TableProps<T>) => {
    const [selectedRows, setSelectedRows] = React.useState<T[]>(select?.selectedRows || []);

    React.useEffect(() => {
        if (select) {
            select.onSelect(selectedRows);
        }
    }, [selectedRows, select]);

    const toggleRowSelection = (row: T) => {
        const rowId = select?.getRowId(row);
        setSelectedRows(prevSelected =>
            prevSelected.some(r => select?.getRowId(r) === rowId)
                ? prevSelected.filter(r => select?.getRowId(r) !== rowId)
                : [...prevSelected, row]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows([...data]);
        }
    };

    return (
        <div className="overflow-visible rounded-lg">
            <table className="min-w-full">
                <thead>
                    <tr>
                        {select && <th className="p-3 text-left p-sm font-semibold">Select</th>}

                        {columns.map(col => (
                            <th key={col.key} className="p-3 text-left p-sm font-semibold">
                                {col.label}
                            </th>
                        ))}

                        {actions && <th className="p-3 text-left p-sm font-semibold">Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {select && (
                        <tr className="">
                            <td className="p-3 overline-1 flex items-center gap-2">
                                {/* <CheckboxDefault
                  checked={selectedRows.length === data?.length}
                  onChange={toggleSelectAll}
                  name={`select-all`}
                  value=""
                /> */}
                                <span>Select all</span>
                            </td>
                        </tr>
                    )}

                    {data?.map((row, rowIndex) => (
                        <tr key={rowIndex} className="text-content-400">
                            {select && (
                                <td className="p-3 overline-1">
                                    {/* <CheckboxDefault
                    checked={selectedRows.some(
                      (selected) =>
                        select?.getRowId(selected) === select?.getRowId(row)
                    )}
                    onChange={() => toggleRowSelection(row)}
                    name={`select-${rowIndex}`}
                    value=""
                  /> */}
                                </td>
                            )}

                            {columns.map(col => {
                                const cellData = (row as Record<string, any>)[col.key];
                                const textColorClass = col.textColor ? col.textColor(cellData) : '';
                                let content;
                                // console.log("cell data", col.type, col.key, cellData);
                                switch (col.type || col.key) {
                                    case 'status':
                                        content = statusDropdown ? (
                                            <TableStatusDropdown
                                                statusOptions={statusOptions || []}
                                                value={cellData}
                                                onChange={(newValue: string) =>
                                                    onStatusChange?.(row, newValue)
                                                }
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                {/* Circle Indicator Before the Value */}
                                                <span
                                                    className={cn(
                                                        'w-3 h-3 rounded-full',
                                                        statusOptions?.find(
                                                            option =>
                                                                option.label.toLowerCase() ===
                                                                cellData?.toLowerCase()
                                                        )?.color || 'bg-gray-500'
                                                    )}
                                                />
                                                <span className="capitalize">{cellData}</span>
                                            </div>
                                        );
                                        break;

                                    case 'object':
                                        content = renderObjectData(
                                            cellData as {
                                                image: string;
                                                title: string;
                                            },
                                            col.key === 'avatar'
                                        );
                                        break;

                                    case 'icon':
                                        content = renderObjectData(
                                            cellData as {
                                                icon: string;
                                                title: string;
                                            },
                                            col.key === 'avatar'
                                        );
                                        break;

                                    case 'image':
                                        content = (
                                            <div>
                                                <img
                                                    src={`${envConfig.API_BASE_URL}/${cellData}`}
                                                    alt={`image`}
                                                    className={cn(
                                                        'size-[2.9375rem]',
                                                        col.key === 'avatar' && 'rounded-full'
                                                    )}
                                                />
                                            </div>
                                        );
                                        break;

                                    default:
                                        content = cellData;
                                }

                                return (
                                    <td
                                        key={col.key}
                                        className={cn('p-3 overline-1', textColorClass)}
                                    >
                                        {content}
                                    </td>
                                );
                            })}

                            {actions && (
                                <td className="flex items-center gap-3 p-3 overline-1">
                                    {actions.map((action, index) => {
                                        let IconComponent = null;

                                        // Conditionally set the IconComponent based on the action type
                                        switch (action.type) {
                                            case 'delete':
                                                IconComponent = DeleteIcon;
                                                break;
                                            case 'edit':
                                                IconComponent = EditIcon;
                                                break;
                                            case 'view':
                                                IconComponent = EyeIcon;
                                                break;
                                                // case 'approve':
                                                //     IconComponent = CheckIcon;
                                                //     break;
                                                // case 'reject':
                                                //     IconComponent = CloseIcon;
                                                break;
                                            default:
                                                IconComponent = null;
                                                break;
                                        }

                                        return (
                                            <button
                                                key={index}
                                                className={cn(
                                                    'rounded-md size-[1.875rem] p-1 flex items-center justify-center text-primary-500 cursor-pointer',
                                                    {
                                                        'bg-red-500/20 text-red-500':
                                                            action.type === 'delete' ||
                                                            action.type === 'reject',
                                                    },
                                                    { 'bg-surface-50': action.type === 'edit' },
                                                    {
                                                        'bg-green-500/20':
                                                            action.type === 'approve',
                                                    },
                                                    { 'bg-surface-50': action.type === 'view' }
                                                )}
                                                onClick={() =>
                                                    action?.onClick && action?.onClick(row)
                                                }
                                            >
                                                {IconComponent && <IconComponent />}
                                            </button>
                                        );
                                    })}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
