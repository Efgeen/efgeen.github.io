const os = (function() {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    

    (function datetime() {
        const now = new Date();
        const dt = document.getElementById("datetime");

        const weekday = weekdays[now.getDay()];
        const month = months[now.getMonth()];
        const day = now.getDate();
        const hour = now.getHours().toString().padStart(2, "0");
        const minute = now.getMinutes().toString().padStart(2, "0");
        const second = now.getSeconds().toString().padStart(2, "0");

        dt.innerHTML = `${weekday} ${month} ${day} ${hour}:${minute}:${second}`;
        const delay = 1000 - now.getMilliseconds();
        setTimeout(datetime, delay);
    })();
    
    return Object.freeze({
        desktop: function() {
            console.log("goto desktop");
        },
        terminal: function(keepAlive) {
            if (keepAlive) {
                console.log("goto terminal");
            }
            else {
                console.log("close terminal");
            }
        },
        brightness: function() {
            const root = document.documentElement;
            const value = window.getComputedStyle(root).getPropertyValue("--primary").trim();
            const dark = window.getComputedStyle(root).getPropertyValue("--efblack").trim();
            switch(value) {
                case dark:
                    root.style.setProperty("--primary", "var(--efwhite)");
                    root.style.setProperty("--secondary", "var(--efblack)");
                    root.style.setProperty("--tetriary", "var(--efred)");
                    break;
                default:
                    root.style.setProperty("--primary", "var(--efblack)");
                    root.style.setProperty("--secondary", "var(--efwhite)");
                    root.style.setProperty("--tetriary", "var(--efred)");
                    break;
            }
        }
    });
})();
