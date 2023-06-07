const MEASURE = (() => {
    return Object.freeze({
        create: function(max) {
            return { max: max, values: [] };
        },
        add: function(me, value) {
            if (me.values.length >= me.max) {
                me.values.splice(0, me.values.length - me.max);
                me.values.shift();
            }
            if (value == Infinity) {
                value = 0;
            }
            me.values.push(value);
        },
        average: function(me) {
            let sum = 0;
            if (me.values.length == 0) {
                return 0;
            }
            me.values.forEach(value => {
                sum += value;
            });
            return sum / me.values.length;
        }
    });
})();
