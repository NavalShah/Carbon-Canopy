class Entity {
  settings = {
    locked: false
  };

  position = new Vector();
  lastPosition = new Vector();
  acceleration = new Vector();

  lifetime = 0;

  constructor(settings = {}) {
    this.settings = { ...settings, ...(this.settings) };
  }

  input(keyPressed, keyDown, mouse) { }

  draw(ctx) { }

  update(dt) {
    if (!this.locked) {
      let velocity = this.position.sub(this.lastPosition);

      this.lastPosition = this.position;
      this.position = this.position.add(Vector.add(velocity, this.acceleration).scale(dt));
      this.acceleration = Vector.zero;
    }

    this.lifetime += dt;
  }
}