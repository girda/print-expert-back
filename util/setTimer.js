const setTimer = (callback, periodTime, startHour, startMinutes) => {
    const now = new Date();
    let start;
    let wait;
    console.log(now);
    if ( now.getHours() <= startHour && now.getMinutes() <= startMinutes) {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinutes, 0, 0);
        console.log('if')
        console.log(start)
    } else {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, startMinutes, 0, 0);
        console.log('else')
        console.log(start)
    }

    wait = start.getTime() - now.getTime();

    console.log(wait)
    if ( wait <= 0 ) {
        setTimer(callback);
        console.log('if wait')
        console.log(wait)
    } else {
        console.log('setTimeout')
        setTimeout(() => {
            callback();
            setInterval(() => {
                callback();
            }, periodTime);
        }, wait);
    }
};
module.exports = setTimer;
