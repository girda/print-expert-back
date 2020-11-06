module.exports = {
    setIntervalAndExecute: (func, time) => {
        func();
        return (setInterval(func, time))
    },
    every8am: (yourcode) => {
    var now = new Date(),
        start,
        wait;
    console.log(now.getMinutes())
    console.log(now.getHours())
    if (now.getHours() <= 16 && now.getMinutes() < 15) {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 15, 0, 0);
        console.log('if')
        console.log(start)
    } else {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 16, 15, 0, 0);
        console.log('else')
        console.log(start)
    }

    wait = start.getTime() - now.getTime();

    if(wait <= 0) { //If missed 8am before going into the setTimeout
        console.log('Oops, missed the hour');
        every8am(yourcode); //Retry
    } else {
        console.log(wait)
        setTimeout(function () { //Wait 8am
            setInterval(function () {
                yourcode();
            }, 10000); //Every day
        },wait);
    }
}

// var yourcode = function () {
//     console.log('This will print evryday at 8am');
// };
// every8am(yourcode);
};
