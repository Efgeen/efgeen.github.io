const os = (() => {
    let tickRate_ = 16;
    let execTime_ = 0;
    let deltaTime_ = 0;
    let tick = 0;

    return Object.freeze({
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
        },
        get tick() {
            return tick;
        },
        set tick(value) {
            tick = value;
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    /* prevent defaults */
    document.body.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    /* tick */
    // let prev;
    // const tm = document.getElementById("tm");

    // rainbow.init(3);

    // (function tick() {
    //     prev = os.time;

    //     tm.innerHTML = os.tm.update();

    //     console.log(`tick ${os.tick}, ${os.execTime.toFixed(4)}/${os.deltaTime.toFixed(4)} (${((os.execTime / os.deltaTime) * 100).toFixed(2)} %)`);

    //     // frac = rainbow.exec(os.deltaTime);
    //     // hue = rainbow.hue(frac);
    //     // hex = rainbow.hex(frac);
    //     // document.getElementById("cur").style.setProperty("filter", `hue-rotate(${(hue + 300) % 360}deg)`);
    //     // document.documentElement.style.setProperty("--efprimary", hex);


    //     os.execTime = (os.time - prev) / 1000;
    //     setTimeout(tick, Math.max((os.tickTime - os.execTime) * 1000, 0));
    //     os.deltaTime = Math.max(os.tickTime, os.execTime);
    //     ++os.tick;
    // })();

    const tm = document.getElementById("tm");

    let t = os.time;
    let dt;
    let to = 0;
    (function tick() {
        dt = performance.now() - t;
        t = performance.now();

        // time
        tm.innerHTML = os.tm.update();

        // tick
        // console.log(`tick = ${os.tick}, dt = ${dt.toFixed(2)}`);
        
        ++os.tick;
        setTimeout(tick, to = Math.max((1000 / os.tickRate) - (dt - to), 0));
    })();
});
