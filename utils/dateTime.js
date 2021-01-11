const formatDateTime = function(date) {
    date = new Date(date);
    const month = date.getMonth()+1;
    const monthString = month >= 10 ? month : `0${month}`;
    const day = date.getDate();
    const dayString = day >= 10 ? day : `0${day}`;
    const hours = date.getHours();
    const hoursString = hours>=10 ? hours: `0${hours}`;
    const minutes = date.getMinutes();
    const minutesString = minutes>=10 ? minutes: `0${minutes}`;
    const seconds = date.getSeconds();
    const secondsString = seconds>=10 ? seconds: `0${seconds}`;
    return `${dayString}-${monthString}-${date.getFullYear()} ${hoursString}:${minutesString}:${secondsString}`;
}

const formatDate = function(date) {
    date = new Date(date);
    const month = date.getMonth()+1;
    const monthString = month >= 10 ? month : `0${month}`;
    const day = date.getDate();
    const dayString = day >= 10 ? day : `0${day}`;
    return `${date.getFullYear()}-${monthString}-${dayString}`;
}

exports.formatDateTime = formatDateTime;
exports.formatDate = formatDate;