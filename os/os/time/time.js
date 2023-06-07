const TIME = (() => {
    const wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const moncols = ["red", "orange", "yellow", "chartreuse", "green", "spring", "cyan", "azure", "blue", "violet", "magenta", "rose"];
    const reds = ["", ""];

    function year(date) {
        return date.getFullYear() - 1900;
    }
    function yday(date) {
        return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    }
    function isdst(date) {
        const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
        const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        return Math.min(jan, jul) !== date.getTimezoneOffset() ? 1 : 0;
    }

    return Object.freeze({
        now: function() {
            const date = new Date();
            return {
                tm_sec: date.getSeconds(),
                tm_min: date.getMinutes(),
                tm_hour: date.getHours(),
                tm_mday: date.getDate(),
                tm_mon: date.getMonth(),
                tm_year: year(date),
                tm_wday: date.getDay(),
                tm_yday: yday(date),
                tm_isdst: isdst(date),
            };
        },
        toString: function(tm) {
            return `<span style="color: var(--ef${tm.tm_wday == 0 ? "red" : "green"});">${wdays[tm.tm_wday]}</span>
                    <span style="color: var(--ef${tm.tm_mday < 9 ? "green" : (tm.tm_mday < 18 ? "yellow" : (tm.tm_mday < 25 ? "orange" : "red"))});">${tm.tm_mday}</span>
                    <span style="color: var(--ef${moncols[tm.tm_mon]});">${mons[tm.tm_mon]}</span> 
                    <span style="color: var(--efred);">${`0${tm.tm_hour}`.slice(-2)}</span><span style="color: var(--efyellow);">:</span><span style="color: var(--efgreen);">${`0${tm.tm_min}`.slice(-2)}</span><span style="color: var(--efcyan);">:</span><span style="color: var(--efazure);">${`0${tm.tm_sec}`.slice(-2)}</span>`;
        }
    });
})();
