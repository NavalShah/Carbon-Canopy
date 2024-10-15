class Droplet extends Entity {
  direction = 0;
  isDroplet = true;

  constructor(position) {
    super();

    this.position.x = position;
    this.direction = (Math.random() * 2 - 1) * 12;
    this.speed = 300 + Math.random() * 100;
  }

  draw() {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;

    let drawdir = this.position.add(this.lastPosition.sub(this.position).scale(12));

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(drawdir.x, drawdir.y);
    ctx.stroke();

  }

  update(dt) {
    super.update(dt);

    this.acceleration.x = this.direction;
    this.acceleration.y = this.speed;

    if (!waterPouring) return;
    if (this.position.y > height + 200) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }
}