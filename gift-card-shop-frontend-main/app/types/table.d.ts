type Action = 'view' | 'approve' | 'reject' | 'edit' | 'delete';

type TableAction<T> = {
    type: TableAction;
    onClick?: (row: T) => void;
    className?: string;
};

type TableColumn = {
    key: string;
    label: string;
    type?: 'object' | 'image' | 'icon';
    textColor?: (value: string) => string;
};

type TableStatsuOption = { label: string; color?: string };

type TablePagination = Pagination & {
    onPageChange: (newPage: number) => void;
};
