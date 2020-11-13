const setTimer = (callback, periodTime, startHour, startMinutes) => {
    const now = new Date();
    let start;
    let wait;

    if ( now.getHours() <= startHour && now.getMinutes() < startMinutes) {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinutes, 0, 0);

    } else {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, startMinutes, 0, 0);
    }

    wait = start.getTime() - now.getTime();

    if ( wait <= 0 ) {
        setTimer(callback);
    } else {
        setTimeout(() => {
            setInterval(() => {
                callback();
            }, periodTime);
        }, wait);
    }
};
module.exports = setTimer;
