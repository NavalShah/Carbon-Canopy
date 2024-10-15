class Player extends Entity {
  keyPressed = {};
  keyDown = {};
  mouse = {};

  direction = 1;

  size = 12;
  jumpCooldown = 0.2;

  constructor() {
    super({ locked: true });

    this.position.x = width / 2;
    this.position.y = height;
  }

  input(keyPressed, keyDown, mouse) {
    this.keyPressed = keyPressed;
    this.keyDown = keyDown;
    this.mouse = mouse;
  }

  draw(ctx) {
    // ctx.fillStyle = "white";
    // ctx.fillRect(this.position.x - this.size, 
    //              this.position.y - this.size, 
    //              this.size * 2, this.size * 2);

    ctx.drawImage(document.getElementById(this.direction == 1 ? "chr" : "chl"), 
                  this.position.x - this.size * this.direction, 
                  this.position.y - this.size * 2, 
                  this.direction * this.size * 2, this.size * 4);
  }

  handleInput(dt) {
    let speed = 120 - (waterPouring ? 100 : 0);

    if (this.keyPressed["a"]){
      this.position.x -= speed * dt;
      this.direction = -1;
    }
    
    if (this.keyPressed["d"]){
      this.position.x += speed * dt;
      this.direction = 1;
    }

    if (this.keyDown["e"] && seedCount > 0) {
      objects.push(new Tree(this.position));
      seedCount--;
    }

    if (this.position.x > width - 100) {
      if (this.keyDown["f"]) seedCount += 2;
    }

    if (this.position.x < 50) {
      if (this.keyDown["f"]) {
        waterPouring = !waterPouring;
      }
    }
  }

  applyGravity() {
    this.position.y += 1;
  }

  applyBoundaries() {
    if (this.position.x < this.size)
      this.position.x = this.size;
    if (this.position.x > width - this.size)
      this.position.x = width - this.size;
    if (this.position.y < this.size * 2)
      this.position.y = this.size * 2;
    if (this.position.y > height - this.size * 2 - 25)
      this.position.y = height - this.size * 2 - 25;
  }

  update(dt) {
    this.applyGravity();
    this.handleInput(dt);

    super.update(dt);

    this.applyBoundaries();
  }
}