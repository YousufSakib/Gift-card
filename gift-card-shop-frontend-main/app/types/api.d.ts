type Pagination = {
    totalDocs?: number;
    limit?: number;
    totalPages?: number;
    page?: number;
    pagingCounter?: number;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    prevPage?: number | null;
    nextPage?: number | null;
};

type APIResponse<T> = {
    docs: T[];
} & Pagination;

type TimeStamp = {
    createdAt?: string;
    updatedAt?: string;
};
