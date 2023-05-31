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

let showingTop = false;
let isTopShown = true;
function showTop(show) {
    if (showingTop) {
        return;
    }
    showingTop = true;

    switch(show) {
        case true:
        case false:
            break;
        default:
            show = !isTopShown;
            break;
    }

    let first = document.querySelector(`div#os > div:first-of-type:last-of-type,
                                        div#os > div:first-of-type:nth-last-of-type(2), 
                                        div#os > div:first-of-type:nth-last-of-type(3)`);
    let second = document.querySelector(`div#os > div:last-of-type:nth-of-type(2),
                                         div#os > div:nth-of-type(2):nth-last-of-type(2)`);
    let third = document.querySelector("div#os > div:last-of-type:nth-of-type(3)");
    
    let top; 
    let mid;
    let bot;
    if (!first || !second) {
        return;
    }
    else if (!third) {
        if (first.classList.contains("top") || second.classList.contains("mid")) {
            top = first;
            mid = second;
            if (show) {
                top.style.height = "30px";
            }
            else {
                top.style.height = "0px";
            }
        }
    }
    else {
        top = first;
        mid = second;
        bot = third;
        
        console.log();
        if (show) {
            top.style.height = "30px";
            mid.style.height = `${parseInt(window.getComputedStyle(mid).height) + 30}px`;
        }
        else {
            top.style.height = "0px";
            mid.style.height = `${parseInt(window.getComputedStyle(mid).height) - 30}px`;
        }
    }

    console.log(top);
    console.log(mid);
    console.log(bot);

    show = !isTopShown;
    
    /* if you have two, assume mid and bot, unless first is marked .top or second is marked .mid */
    // top = document.querySelector("div#os > div:first-of-type:nth-last-of-type(2).top");
    // mid = document.querySelector("div#os > div:first-of-type:nth-last-of-type(2):not(.mid), div#os > div:last-of-type:nth-of-type(2).mid");
    // bot = document.querySelector("div#os > div:last-of-type:nth-of-type(2):not(.mid)");

    // console.log(top);
    // console.log(mid);
    // console.log(bot);

    // top = document.querySelector("div#os > div:first-of-type:nth-last-of-type(3)");
    // mid = document.querySelector("div#os > div:nth-of-type(2):nth-last-of-type(2)");
    // bot = document.querySelector("div#os > div:last-of-type:nth-of-type(3)");

    // if (!top || !mid) {
    //     return;
    // }

    // if (show != true && show != false) {
    //     show = !isTopShown;
    // }

    // switch(show) {
    //     case true:
    //         top.style.height = "30px"
    //         break;
    //     default:
    //         top.style.height = "0px";
    //         break;
    // }

    isTopShown = show;
    showingTop = false;
}

