export const getDataTimeFormat = (dateTime) => {
    const dateObject = new Date(dateTime);
    const formattedDateTime = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()} ${dateObject.getHours()}:${String(dateObject.getMinutes()).padStart(2, '0')}:${String(dateObject.getSeconds()).padStart(2, '0')}`;
    return formattedDateTime;
};