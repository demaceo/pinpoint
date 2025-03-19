export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};


export const formatBillDate = (dateString: string | undefined): string => {
    if (!dateString) return "Not available";

    const dateObj = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23", // Ensures 24-hour format
    };

    return new Intl.DateTimeFormat("en-US", options).format(dateObj);
};
