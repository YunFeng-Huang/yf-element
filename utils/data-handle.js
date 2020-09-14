function formatNumber(n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}
/**
 * @param {date} date
 * @param {string} seperator
 * @param {string} format
 * @returns {string}
 */
export function formatDate(date, seperator, format = 'ymd') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const ymd = [year, month, day].map(formatNumber).join(seperator);
    const hms = [hour, minute, second].map(formatNumber).join(seperator);

    if (format === 'ymd') {
        return `${ymd}`;
    }
    return `${ymd} ${hms}`;
}