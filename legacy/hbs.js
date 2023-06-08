const hbs = Object.freeze({
    gist: function(text) {
        const template = Handlebars.compile("{{text}}");
        return template({ text: text });
    }
});
