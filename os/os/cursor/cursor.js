document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener("mousedown", () => {
        let curs = document.querySelectorAll(".cur");
        curs.forEach(cur => {
            cur.classList.add("cur1");
            cur.classList.remove("cur");
        });
    });
    document.addEventListener("mouseup", () => {
        let curs = document.querySelectorAll(".cur1");
        curs.forEach(cur => {
            cur.classList.add("cur");
            cur.classList.remove("cur1");
        });
    });
});
