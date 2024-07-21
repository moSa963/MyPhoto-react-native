export const parseTime = (timeStr) => {
    const millis = Date.now() - Date.parse(timeStr);
    const seconds = millis / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    if (years >= 1) {
        return new Date(timeStr).toUTCString();
    } else if (days >= 1) {
        return days.toFixed() + " days";
    } else if (hours >= 1) {
        return hours.toFixed() + " hours";
    } else if (minutes >= 1) {
        return minutes.toFixed() + " minutes";
    } else {
        return seconds.toFixed() + " seconds";
    }
}