bitlib.math = {
    norm: function (value, min, max) {
        return (value - min) / (max - min);
    },

    lerp: function (min, max, t) {
        return min + (max - min) * t;
    },

    map: function (srcValue, srcMin, srcMax, dstMin, dstMax) {
        var norm = this.norm(srcValue, srcMin, srcMax);
        return this.lerp(norm, dstMin, dstMax);
    },

    clamp: function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    dotProduct: function(x0, y0, x1, y1, x2, y2, x3, y3) {
        var dx0 = x1 - x0,
            dy0 = y1 - y0,
            dx1 = x3 - x2,
            dy1 = y3 - y2;
        return dx0 * dx1 + dy0 * dy1;
    },

    angleBetween: function(x0, y0, x1, y1, x2, y2, x3, y3) {
        var dp = this.dotProduct(x0, y0, x1, y1, x2, y2, x3, y3),
            mag0 = this.dist(x0, y0, x1, y1),
            mag1 = this.dist(x2, y2, x3, y3);
        return Math.acos(dp / mag0 / mag1);
    },

    polarToPoint: function (angle, radius) {
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    },

    pointToPolar: function(p) {
        return {
            angle: Math.atan2(p.y, p.x),
            radius: this.magnitude(p)
        };
    },

    magnitude: function(p) {
        return this.dist(0, 0, p.x, p.y);
    },

    dist: function (x0, y0, x1, y1) {
        if(arguments.length === 2) {
            return this.dist(x0.x, x0.y, y0.x, y0.y);
        }
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },

    lerpPoint: function(p0, p1, t) {
        return {
            x: bitlib.math.lerp(p0.x, p1.x, t),
            y: bitlib.math.lerp(p0.y, p1.y, t)
        };
    },

    bezier: function(p0, p1, p2, p3, t) {
        var oneMinusT = 1 - t,
            m0 = oneMinusT * oneMinusT * oneMinusT,
            m1 = 3 * oneMinusT * oneMinusT * t,
            m2 = 3 * oneMinusT * t * t,
            m3 = t * t * t;
        return {
            x: m0 * p0.x + m1 * p1.x + m2 * p2.x + m3 * p3.x,
            y: m0 * p0.y + m1 * p1.y + m2 * p2.y + m3 * p3.y
        };
    },

    quadratic: function(p0, p1, p2, t) {
        var oneMinusT = 1 - t,
            m0 = oneMinusT * oneMinusT,
            m1 = 2 * oneMinusT * t,
            m2 = t * t;
        return {
            x: m0 * p0.x + m1 * p1.x + m2 * p2.x,
            y: m0 * p0.y + m1 * p1.y + m2 * p2.y
        }

    },

    pointInCircle: function(px, py, cx, cy, cr) {
        var dist = this.dist(px, py, cx, cy);
        return dist <= cr;
    },

    pointInRect: function(px, py, rx, ry, rw, rh) {
        return px >= rx &&
            py >= ry &&
            px <= rx + rw &&
            py <= ry + rh;
    }


};
