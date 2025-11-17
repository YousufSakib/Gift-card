export const truncateString = (
    string: string | undefined,
    startLength = 5,
    endLength = 5
): string => {
    if (!string) return '';

    if (string.length <= startLength + endLength) return string;

    return `${string.slice(0, startLength)}...${string.slice(-endLength)}`;
};
