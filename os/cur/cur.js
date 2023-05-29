const cur = (() => {
    let x = 0;
    let y = 0;
    let z = 0;

    return Object.freeze({
        get X() {
            return x;
        },
        set X(value) {
            x = value;
        },
        get Y() {
            return y;
        },
        set Y(value) {
            y = value;
        },
        get Z() {
            return z;
        },
        set Z(value) {
            z = value;
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    let obj = document.querySelector("#cur");
    cur.Z = parseInt(sessionStorage.getItem("z"), 10);
    switch(cur.Z) {
        case 1:
            obj.style.left = (cur.X = parseInt(sessionStorage.getItem("x"), 10)) + "px";
            obj.style.top = (cur.Y = parseInt(sessionStorage.getItem("y"), 10)) + "px";
            break;
        default:
            obj.style.display = "none";
            break;
    }
    document.addEventListener('mousemove', function(e) {
        obj.style.left = (cur.X = e.clientX) + "px";
        obj.style.top = (cur.Y = e.clientY) + "px";
    });
    document.addEventListener("mouseenter", () => {
        cur.Z = 1;
        obj.style.display = "block";
    });
    document.addEventListener("mouseleave", () => {
        cur.Z = 0;
        obj.style.display = "none";
    });
    window.addEventListener("beforeunload", function() {
        sessionStorage.setItem("x", cur.X);
        sessionStorage.setItem("y", cur.Y);
        sessionStorage.setItem("z", cur.Z);
    });
});
