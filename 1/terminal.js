const terminal = (function() {
    const fn = (text, dlay, callback) => {
        const t = document.getElementById("terminal");
        let textIndex = 0;
        let split = text.split("<br>");
        let splitIndex = 0;
        let span = document.createElement("span");
        t.appendChild(span);
        const ival = setInterval(() => {
            if (textIndex < text.length) {
                const c = text.charAt(textIndex);
                if (c === "<") {
                    const endIndex = text.indexOf(">", textIndex);
                    const tag = text.substring(textIndex, endIndex + 1);
                    textIndex = endIndex + 1;
                    if (tag === "<br>") {
                        t.appendChild(document.createElement("br"));
                        span = document.createElement("span");
                        t.appendChild(span);
                        ++splitIndex;
                    }
                }
                else {
                    span.innerHTML += c;
                    ++textIndex;
                }
            }
            else {
                ++splitIndex;
            }
            if (splitIndex >= split.length) {
                t.appendChild(document.createElement("br"));
                clearInterval(ival);
                callback?.();
            }
    }, dlay);
};

return Object.freeze({
    input: function(text, callback) {
        const t = document.getElementById("terminal");
        t.innerHTML += "> ";
        fn(text, 100, callback);
    },
    output: function(text, callback) {
        fn(text, 1, callback);
    }
});
})();
