bitlib.random = {
    _seed: Date.now(),
    _a: 1664525,
    _c: 1013904223,
    _m: Math.pow(2, 32),

    seed: function(seed) {
        this._seed = seed;
    },

    _int: function() {
        // range [0, 2^32)
        this._seed = (this._seed * this._a + this._c) % this._m;
        return this._seed;
    },

    _float: function() {
        // range [0, 1)
        return this._int() / this._m;
    },

    bool: function(percent) {
        // percent is chance of getting true
        if(percent == null) {
            percent = 0.5;
        }
        return this._float() < percent;
    },

    float: function(min, max) {
        // range [min, max)
        if(arguments.length === 1) {
            return this._float() * min;
        }
        if(arguments.length === 2) {
            return min + this._float() * (max - min);
        }
        return this._float();
    },

    int: function(min, max) {
        // range [min, max)
        if(arguments.length === 1) {
            return Math.floor(this._float() * min);
        }
        if(arguments.length === 2) {
            return Math.floor(this.float(min, max));
        }
        return this._int();
    }

};
