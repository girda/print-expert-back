module.exports = (callback, periodTime, startHour) => {
    const now = new Date();
    let start;
    let wait;

    if ( now.getHours() < startHour ) {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, 0, 0, 0);

    } else {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, 0, 0, 0);
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
