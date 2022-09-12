window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (t) {
        window.setTimeout(t, 1e3 / 60);
    };
const canvas = document.getElementById("canvas-1"),
    ctx = canvas.getContext("2d");
(canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
class Vector {
    constructor(t, i) {
        (this.x = isNaN(t) ? 0 : t), (this.y = isNaN(i) ? 0 : i);
    }
    add(t) {
        return (this.x += isNaN(t) ? t.x : t), (this.y += isNaN(t) ? t.y : t), this;
    }
    sub(t) {
        return (this.x -= isNaN(t) ? t.x : t), (this.y -= isNaN(t) ? t.y : t), this;
    }
    mul(t) {
        return (this.x *= isNaN(t) ? t.x : t), (this.y *= isNaN(t) ? t.y : t), this;
    }
    div(t) {
        return (this.x /= isNaN(t) ? t.x : t), (this.y /= isNaN(t) ? t.y : t), this;
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    dist(t) {
        let i = this.x - t.x,
            s = this.y - t.y;
        return Math.sqrt(i * i + s * s);
    }
    clamp(t, i) {
        return (this.x = Math.min(Math.max(this.x, t), i)), (this.y = Math.min(Math.max(this.y, t), i)), this;
    }
    normalise() {
        let t = Math.sqrt(this.x * this.x + this.y * this.y);
        return (this.x = 0 === t ? 0 : this.x / t), (this.y = 0 === t ? 0 : this.y / t), this;
    }
}
class Creature {
    constructor(t, i, s, e) {
        (this.position = new Vector(t, i)), (this.velocity = new Vector()), (this.steering = new Vector()), (this.target = new Vector(s, e)), (this.size = 2), (this.maxVelocity = 1), (this.maxSteer = 0.01), (this.maxSpeed = 2);
    }
    update() {
        let t = this.target.clone().sub(this.position).normalise().mul(this.maxVelocity);
        (this.steering = t.sub(this.velocity).clamp(-this.maxSteer, this.maxSteer)),
            this.velocity.add(this.steering).clamp(-this.maxSpeed, this.maxSpeed),
            this.position.add(this.velocity),
            Math.abs(this.position.dist(this.target)) < 10 && ((this.target.x = Math.random() * canvas.width), (this.target.y = Math.random() * canvas.height));
    }
    render(t) {
        t.beginPath(),
            t.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI),
            (t.fillStyle = "#24CDD5"),
            t.fill(),
            t.beginPath(),
            t.arc(this.target.x, this.target.y, this.size / 2, 0, 2 * Math.PI),
            (t.fillStyle = "#4d5bed"),
            t.fill();
    }
}
let creatures = [];
for (let t = 0; t < 20; t++) creatures.push(new Creature(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * canvas.width, Math.random() * canvas.height));
!(function t(i) {
    (ctx.fillStyle = "rgba(255,255,255,0.3)"),
        ctx.fillRect(0, 0, canvas.width, canvas.height),
        creatures.forEach((t) => {
            t.update(), t.render(ctx);
        }),
        window.requestAnimFrame(t);
})();
