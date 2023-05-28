const cur = (() => {
    return Object.freeze({
        data: { 
            x: 0,
            y: 0,
            z: 0
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    let obj = document.querySelector("#cur");

    cur.data.x = parseInt(sessionStorage.getItem("x"), 10);
    cur.data.y = parseInt(sessionStorage.getItem("y"), 10);
    cur.data.z = parseInt(sessionStorage.getItem("z"), 10);

    switch(cur.data.z) {
        case 1:
            obj.style.left = cur.data.x + "px";
            obj.style.top = cur.data.y + "px";
            break;
        default:
            obj.style.display = "none";
            break;
    }

    document.addEventListener('mousemove', function(e) {
        cur.data.x = e.clientX;
        cur.data.y = e.clientY;
        obj.style.left = e.clientX + "px";
        obj.style.top = e.clientY + "px";
    });
    document.addEventListener("mouseenter", () => {
        cur.data.z = 1;
        obj.style.display = "block";
    });
    document.addEventListener("mouseleave", () => {
        cur.data.z = 0;
        obj.style.display = "none";
    });
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem("x", cur.data.x);
        sessionStorage.setItem("y", cur.data.y);
        sessionStorage.setItem("z", cur.data.z);
    });
});
