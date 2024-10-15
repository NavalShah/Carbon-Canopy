class Vector {
  x = 0;
  y = 0;

  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get norm() {
    let magnitude = this.magnitude;
    return new Vector(this.x / magnitude, this.y / magnitude);
  }

  add(v) {
    return Vector.add(this, v);
  }

  sub(v) {
    return Vector.sub(this, v);
  }

  mul(v) {
    return Vector.mul(this, v);
  }

  div(v) {
    return Vector.div(this, v);
  }

  scale(s) {
    return Vector.scale(this, s);
  }

  static zero = new Vector(0, 0);
  static up = new Vector(0, -1);
  static down = new Vector(0, 1);
  static left = new Vector(-1, 0);
  static right = new Vector(1, 0);

  static add(v, w) {
    return new Vector(v.x + w.x, v.y + w.y);
  }

  static sub(v, w) {
    return new Vector(v.x - w.x, v.y - w.y);
  }

  static mul(v, w) {
    return new Vector(v.x * w.x, v.y * w.y);
  }

  static div(v, w) {
    return new Vector(v.x / w.x, v.y / w.y);
  }

  static scale(v, s) {
    return new Vector(v.x * s, v.y * s);
  }

  static dot(v, w) {
    return v.x * w.x + v.y * w.y;
  }

  static dist(v, w) {
    let dx = v.x - w.x;
    let dy = v.y - w.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}