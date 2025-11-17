import { ChevronRightIcon } from '~/constants/icons';
import Divider from '../Divider';

type Props = { paginationOptions: TablePagination };

export default function TablePagination({ paginationOptions }: Props) {
    const {
        pagingCounter = 1,
        limit = 10,
        totalPages = 1,
        totalDocs = 0,
        hasNextPage = false,
        hasPrevPage = false,
        onPageChange,
        page = 1,
    } = paginationOptions;

    const startRecord = pagingCounter;
    const endRecord = Math.min(startRecord + limit - 1, totalDocs as number);

    const getPageNumbers = () => {
        const pages: (number | '...')[] = [];
        const range = 2; // Range of pages before and after the current page

        // Show the first page
        if (page > range + 1) {
            pages.push(1);
            pages.push('...');
        }

        // Add pages before the current page
        for (let i = Math.max(page - range, 1); i < page; i++) {
            pages.push(i);
        }

        // Always include the current page
        pages.push(page);

        // Add pages after the current page
        for (let i = page + 1; i <= Math.min(page + range, totalPages); i++) {
            pages.push(i);
        }

        // Show the last page
        if (page < totalPages - range) {
            pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="space-y-6">
            <Divider className="bg-surface-600" />

            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[14px]">
                        {startRecord}-{endRecord} of {totalDocs} items
                    </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={!hasPrevPage}
                        className="text-content-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRightIcon className="rotate-180" />
                    </button>

                    {/* Page Numbers with Ellipses */}
                    {getPageNumbers().map((p, index) =>
                        p === '...' ? (
                            <span key={index} className="px-2 text-gray-4">
                                ...
                            </span>
                        ) : (
                            <button
                                key={index}
                                type="button"
                                onClick={() => onPageChange(p as number)}
                                disabled={page === p}
                                className={`px-3 py-2 rounded-md text-[14px] cursor-pointer ${
                                    page === p
                                        ? 'bg-primary-500 text-content-50 disabled:cursor-not-allowed'
                                        : 'bg-transparent text-content-500'
                                }`}
                            >
                                {p}
                            </button>
                        )
                    )}

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={!hasNextPage}
                        className="text-content-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
