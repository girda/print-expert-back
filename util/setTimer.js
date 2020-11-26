const setTimer = ({callback, periodTime, startHour, startMinutes, timerTimeout, timerInterval, callbackWhere}) => {
    const now = new Date();
    let start;
    let wait;
    console.log(now);
    console.log(periodTime);
    if ( now.getHours() <= startHour && now.getMinutes() < startMinutes) {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinutes, 0, 0);
        console.log('if');
        console.log(start);
    } else {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, startMinutes, 0, 0);
        console.log('else');
        console.log(start);
    }

    wait = start.getTime() - now.getTime();


    console.log(wait);
    if ( wait <= 0 ) {
        console.log('if wait');
        console.log(wait);
        setTimer({callback, periodTime, startHour, startMinutes, timerTimeout, timerInterval, callbackWhere});
    } else {
        console.log('setTimeout');
        timerTimeout = setTimeout(() => {
            callback(callbackWhere);
            console.log(periodTime);
            timerInterval = setInterval(() => {
                callback(callbackWhere);
            }, periodTime);
        }, wait);
    }
};

module.exports = setTimer;
