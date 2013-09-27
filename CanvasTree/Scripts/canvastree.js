var Branch = (function () {
    function Branch(l, a) {
        var branches = this.branches = [];
        this.lenght = l;
        this.angle = a;
        this.color = "rgb(" + 128 + "," + Math.floor(255 * (this.lenght / 100)) + "," + Math.floor(128 * this.lenght / 100) + ")";

        if (this.lenght > 20) {
            for (var i = 0; i < random(1, 4); i++) {
                branches.push(new Branch(this.lenght * random(0.6, 0.9), -random(-50, 50)));
            }
        }
    }
    Branch.prototype.render = function (gen, ctx) {
        var c = this.color;
        var lengthThisBranch = this.lenght * (gen > 1 ? 1 : gen);
        ctx.save();
        ctx.strokeStyle = c;
        ctx.beginPath();
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.lineWidth = lengthThisBranch / 10;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -lengthThisBranch);
        ctx.stroke();
        ctx.translate(0, -lengthThisBranch);
        if (gen > 1) {
            for (var i = 0; i < this.branches.length; i++) {
                this.branches[i].render(gen - 1, ctx);
            }
        }
        ctx.restore();
    };
    return Branch;
})();

var canvas = document.getElementById('canv');
var txt = document.getElementById('gen');
var ctx = canvas.getContext('2d');

ctx.translate(250, 500);
var tree = new Branch(100, 0);

//tree.render(10000);
var gen = 0;

setInterval(loop, 25);

var inc = 0.6;

function loop() {
    if (gen > 20)
        inc = -inc;

    if (gen < 0) {
        tree = new Branch(100, 0);
        gen = 0;
        inc = -inc;
    }

    gen += inc;
    txt.innerHTML = gen.toString();
    ctx.clearRect(-250, 0, 500, -500);
    ctx.save();
    tree.render(gen, ctx);
    ctx.restore();
}

function random(min, max) {
    if (min > max) {
        var t = min;
        min = max;
        max = t;
    }
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=canvastree.js.map
