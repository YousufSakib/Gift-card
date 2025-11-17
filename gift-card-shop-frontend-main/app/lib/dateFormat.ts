export const dateFormat = (dateString: string | undefined) => {
    if (dateString === undefined) return;

    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
