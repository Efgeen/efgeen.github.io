const OS = (() => {
    let tickRate_ = 16;
    let execTime_ = 0;
    let deltaTime_ = 0;
    let tick = 0;

    return Object.freeze({
        time: TIME,

        get tickRate() {
            return tickRate_;
        },
        set tickRate(value) {
            tickRate_ = value;
        },
        get tickTime() {
            return 1 / tickRate_;
        },
        get runTime() {
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
    let fpsMeasure = MEASURE.create(OS.tickRate);
    let tpsMeasure = MEASURE.create(OS.tickRate);
    let rttMeasure = MEASURE.create(1);

    /* prevent defaults */
    document.body.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    /* ws */
    let ws;
    function connect() {
        ws = new WebSocket("ws://localhost:8080");
        ws.onerror = () => {};
        ws.onopen = () => {};
        ws.onmessage = () => {
            msgrecv = true;
        };
    }

    connect();

    let wsTime = 0;
    let msgrecv = false;
    
    function message() {
        if (ws.readyState !== WebSocket.OPEN) {
            return;
        }
        wsTime = performance.now();
        ws.send("ping");
    }
    function messagecb() {
        MEASURE.add(rttMeasure, (performance.now() - wsTime));
        msgrecv = false;
    } 

    let versionElement;
    let timeElement;
    let fpsElement;
    let tpsElement;
    let rttElement;
    let popupElement;
    if (!function start() {
        if (!(versionElement = document.querySelector("#version"))) {
            console.error("404 versionElement");
            return false;
        }
        if (!(timeElement = document.querySelector("#time"))) {
            console.error("404 timeElement");
            return false;
        }
        if (!(fpsElement = document.querySelector("#fps"))) {
            console.error("404 fpsElement");
            return false;
        }
        if (!(tpsElement = document.querySelector("#tps"))) {
            console.error("404 tpsElement");
            return false;
        }
        if (!(rttElement = document.querySelector("#rtt"))) {
            console.error("404 rttElement");
            return false;
        }
        versionElement.innerHTML = `<span style="color: var(--efred);">0</span><span style="color: var(--efyellow);">.</span><span style="color: var(--efgreen);">1</span><span style="color: var(--efcyan);">.</span><span style="color: var(--efazure);">0</span></span><span style="color: var(--efmagenta);">-</span><span style="color: var(--efgray);">alpha</span>`;
        fpsElement.innerHTML = `<span style="color: var(--efviolet)">FPS: </span><span style="color:var(--efgray)">Not Measured</span>`;
        tpsElement.innerHTML = `<span style="color: var(--efmagenta)">TPS: </span><span style="color:var(--efgray)">Not Measured</span>`;
        rttElement.innerHTML = `<span style="color: var(--efrose)">RTT: </span><span style="color: var(--efgray)">Not Connected</span>`;

        // popups
        popupElement = document.querySelector("#popup");
        versionElement.addEventListener("mouseover", (event) => {
            popupElement.style.display = "block";
            popupElement.innerHTML = `<span style="color:var(--efred)">&lt;major&gt;</span><span style="color:var(--efyellow)">.</span><span style="color:var(--efgreen)">&lt;minor&gt;</span><span style="color:var(--efcyan)">.</span><span style="color:var(--efazure)">&lt;patch&gt;</span><span style="color:var(--efmagenta)">-</span><span style="color:var(--efdarkred)">&lt;pre-release&gt;</span><span style="color:var(--efdarkyellow)">+</span><span style="color:var(--efdarkgreen)">&lt;build&gt;</span>`;
        });
        versionElement.addEventListener("mousemove", (event) => {
            popup.style.left = `${event.clientX + 1}px`;
            popup.style.top = `${event.clientY + 1}px`;
        });
        versionElement.addEventListener("mouseout", (event) => {
            popupElement.style.display = "none";
        });

        return true;
    }()) {
        return;
    }

    let oncePerSecondAccumulated = 0;
    let oncePerSecondInterval = 1;

    let updateTime = OS.runTime;
    let updateDeltaTime;
    let updateTimeout = 0;
    (function update() {
        updateDeltaTime = (performance.now() - updateTime) / 1000;
        updateTime = performance.now();
        MEASURE.add(tpsMeasure, updateDeltaTime !== 0 ? 1 / updateDeltaTime : 0);

        if (msgrecv) {
            messagecb();
        }
        message();

        /* time, every tick for millisecond precision */
        document.querySelector("#time").innerHTML = `${OS.time.toString(OS.time.now())}<span style="color: var(--efmagenta)">.</span><span style="color: var(--efgray)">${new Date().getMilliseconds().toString().padStart(3, "0")}</span>`;

        /* once per second */
        oncePerSecondAccumulated += updateDeltaTime;
        if (oncePerSecondAccumulated >= oncePerSecondInterval) {
            let fps = MEASURE.average(fpsMeasure);
            let tps = MEASURE.average(tpsMeasure);
            let rtt = MEASURE.average(rttMeasure);
            
            fpsElement.innerHTML = `<span style="color: var(--efviolet)">FPS: </span><span style="color: ${fps == 0 ? "var(--efred)" : "var(--efgreen)"}">${fps.toFixed(2)}</span>`;
            tpsElement.innerHTML = `<span style="color: var(--efmagenta)">TPS: </span><span style="color: ${tps == 0 ? "var(--efred)" : "var(--efgreen)"}">${tps.toFixed(2)}</span>`;
            /* league ping: 0-129 = green, 130-199 = yellow, 200-349 = orange, 350 - 999 = red */
            rttElement.innerHTML = `<span style="color: var(--efrose)">RTT: </span><span style="color: var(--ef${rttMeasure.values.length !== 0 ? (rtt < 130 ? "green" : (rtt < 200 ? "yellow" : (rtt < 350 ? "orange" : "red"))) : "gray"});">${rttMeasure.values.length !== 0 ? rtt.toFixed(2) : "Not Connected"}</span>`;
            do {
                oncePerSecondAccumulated -= oncePerSecondInterval;
            } while(oncePerSecondAccumulated >= oncePerSecondInterval);
        }

        ++OS.tick;
        setTimeout(update, (updateTimeout = Math.max((1 / OS.tickRate) - (updateDeltaTime - updateTimeout), 0)) * 1000);
    })();

    let renderTime = performance.now();
    let renderDeltaTime;
    (function render() {
        renderDeltaTime = (performance.now() - renderTime) / 1000;
        renderTime = performance.now();
        MEASURE.add(fpsMeasure, renderDeltaTime !== 0 ? 1 / renderDeltaTime : 0);
        requestAnimationFrame(render);
    })();

    // let fpst = performance.now();
    // (function fpsProc() {
    //     let fpsdt = (performance.now() - fpst) / 1000;
    //     fpst = performance.now();
    //     MEASURE.add(fpsMeasure, 1 / fpsdt);
    //     requestAnimationFrame(fpsProc);
    // })();
});



let showingTop = false;
let isTopShown = true;

function showInit() {
    let first = document.querySelector(`div#os > div:first-of-type:last-of-type,
                                        div#os > div:first-of-type:nth-last-of-type(2), 
                                        div#os > div:first-of-type:nth-last-of-type(3)`);
    let second = document.querySelector(`div#os > div:last-of-type:nth-of-type(2),
                                         div#os > div:nth-of-type(2):nth-last-of-type(2)`);
    let third = document.querySelector("div#os > div:last-of-type:nth-of-type(3)");
    
    if (!first || !second) {
        return null;
    }

    if (!third) {
        if (!first.classList.contains("top") && !second.classList.contains("mid")) {
            return { mid: first, bot: second };
        }
        else {
            return { top: first, mid: second };
        }
    }

    return { top: first, mid: second, bot: third };
}

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

    let res = showInit();

    if (!res) {
        return;
    }

    let top = res.top;
    let mid = res.mid;
    let bot = res.bot;
    
    if (show) {
        top.style.animation = "none";
        void top.offsetWidth;
        top.style.animation = "top 0.1s linear 0s 1 reverse backwards running";
        mid.style.height = `${parseInt(window.getComputedStyle(mid).height) - 32}px`;
        mid.style.transform = "translateY(0)";
        if (!bot) {
            mid.style.height = "calc(100% - 31px)";
        }
        else {
            mid.style.height = "calc(100% - 62px)";
        }
    }
    else {
        top.style.animation = "none";
        void top.offsetWidth;
        top.style.animation = "top 0.1s linear 0s 1 normal forwards running";
        mid.style.height = `${parseInt(window.getComputedStyle(mid).height) + 32}px`;
        mid.style.transform = "translateY(-31px)";
        if (!bot) {
            mid.style.height = "100%";
        }
        else {
            mid.style.height = "calc(100% - 31px)";
        }
    }

    isTopShown = show;
    showingTop = false;
}

let showingBot = false;
let isBotShown = true;

function showBot(show) {
    if (showingBot) {
        return;
    }
    showingBot = true;

    switch(show) {
        case true:
        case false:
            break;
        default:
            show = !isBotShown;
            break;
    }

    let res = showInit();

    if (!res) {
        return;
    }

    let mid = res.mid;
    let bot = res.bot;
    
    if (show) {
        bot.style.animation = "none";
        void bot.offsetWidth;
        bot.style.animation = "bot 0.1s linear 0s 1 reverse backwards running";
        mid.style.height = "calc(100% - 31px)";
    }
    else {
        bot.style.animation = "none";
        void bot.offsetWidth;
        bot.style.animation = "bot 0.1s linear 0s 1 normal forwards running";
        mid.style.height = "100%";
    }

    isBotShown = show;
    showingBot = false;
}