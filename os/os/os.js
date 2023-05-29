const os = (() => {
    let tickRate_ = 16;
    let execTime_ = 0;
    let deltaTime_ = 0;

    return Object.freeze({
        cur: cur,
        tm: tm,

        get tickRate() {
            return tickRate_;
        },
        set tickRate(value) {
            tickRate_ = value;
        },
        get tickTime() {
            return 1 / tickRate_;
        },
        get time() {
            return performance.now();
        },
        get execTime() {
            return execTime_;
        },
        set execTime(value) {
            execTime_ = value;
        },
        get deltaTime() {
            return deltaTime_;
        },
        set deltaTime(value) {
            deltaTime_ = value;
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    /* prevent defaults */
    document.body.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    /* tick */
    let prev;
    const tm = document.getElementById("tm");
    let frac;
    let hue;
    let hex;

    rainbow.init(3);

    (function tick() {
        prev = os.time;

        tm.innerHTML = os.tm.update();

        frac = rainbow.exec(os.deltaTime);
        hue = rainbow.hue(frac);
        hex = rainbow.hex(frac);
        document.getElementById("cur").style.setProperty("filter", `hue-rotate(${(hue + 300) % 360}deg)`);
        document.documentElement.style.setProperty("--efprimary", hex);

        os.execTime = (os.time - prev) / 1000;
        os.deltaTime = Math.max(1 / os.tickRate, os.execTime);
        setTimeout(tick, Math.max(((1 / os.tickRate) - os.execTime) * 1000, 0));
    })();
});
