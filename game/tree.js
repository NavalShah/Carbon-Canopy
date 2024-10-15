class Tree extends Entity {
  growth = 0;
  level = 0;

  constructor(position) {
    super({ locked: true });

    this.position.x = position.x;
  }

  draw() {
    this.level = Math.min(this.level, 4);

    ctx.drawImage(document.getElementById("tree" + this.level), this.position.x - 256, height - 512, 512, 512);
  }

  update(dt) {
    super.update(dt);

    if (!waterPouring) {
      this.growth += dt * 0.2;
      return;
    }

    this.growth += dt;

    if (this.growth > 8) {
      if (Math.random() > .8) {
        this.level++;
        this.growth = 0;
      }
    }
  }
}