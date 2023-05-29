const tm = (() => {
    const wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    

    return Object.freeze({
        update: function() {
            const tm = new Date();
            const wday = wdays[tm.getDay()];
            const mon = mons[tm.getMonth()];
            const mday = tm.getDate();
            const hour = tm.getHours().toString().padStart(2, "0");
            const min = tm.getMinutes().toString().padStart(2, "0");
            const sec = tm.getSeconds().toString().padStart(2, "0");
            return `${wday} ${mon} ${mday} ${hour}:${min}:${sec}`;
        }
    });
})();
