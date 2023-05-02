const gist = Object.freeze({
    load: function(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Accept", "application/vnd.github+json");
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    },
    raw: function(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send();
    }
});
