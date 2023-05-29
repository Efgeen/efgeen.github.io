const rainbow = (() => {
    const colors_ = [ "--efred", "--efyellow", "--efgreen", "--efaqua", "--efblue", "--efmagenta" ];
    const hexes_ = [];
    let index_ = 0;
    let interval_ = 6;
    let accumulated_ = 0.0;
    function hex2rgb(hex) {
        const shorthandRegex = /^\s*#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})?$/i;
        const result = shorthandRegex.exec(hex);
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return { r, g, b };
    };

    function lerp(begin, end, fraction) {
        const begin_ = hex2rgb(begin);
        const end_ = hex2rgb(end);
        const r = Math.round(begin_.r + (end_.r - begin_.r) * fraction);
        const g = Math.round(begin_.g + (end_.g - begin_.g) * fraction);
        const b = Math.round(begin_.b + (end_.b - begin_.b) * fraction);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return Object.freeze({
        init: function(interval) {
            interval_ = interval;

            const com = window.getComputedStyle(document.documentElement);
            colors_.forEach(color => {
                hexes_.push(com.getPropertyValue(color));
            });
        },
        exec: function(dt) {
            accumulated_ += dt;
            index_ = Math.floor((accumulated_ / interval_) * hexes_.length) % hexes_.length;
            while(accumulated_ > interval_) {
                accumulated_ -= interval_;
            }
            return accumulated_ / interval_;
        },
        hue: function(fraction) {
            return fraction * 360;
        },
        hex: function(fraction) {
            return lerp(hexes_[index_], hexes_[(index_ + 1) % hexes_.length], (fraction % (1 / hexes_.length)) * hexes_.length);
        }
    });
})();
