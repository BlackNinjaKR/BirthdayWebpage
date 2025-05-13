  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("star-canvas");
    const ctx = canvas.getContext("2d");
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  
    const stars = [];
    const STAR_COUNT = 100;
  
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
  
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
  
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawStars);
    }
  
    drawStars();
  });
  


  


  
  const canvas = document.getElementById('fairyCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const maxParticles = 100;
const colorHue = Math.random() * 360;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
  if (particles.length > maxParticles) {
    particles.splice(0, particles.length - maxParticles);
  }
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.alpha = 1;
    this.fade = 0.02 + Math.random() * 0.02;
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
    // Neon bright colors (rainbow palette)
const neonColors = [
    '255,255,255', // white
    '255,255,0',   // neon yellow
    '0,255,255',   // neon cyan
    '255,0,255',   // neon magenta
    '0,255,0',     // neon green
    '0,128,255',   // neon blue
    '255,0,0',     // neon red
    '255,102,0'    // neon orange
  ];
  this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
  
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= this.fade;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.shadowBlur = 50; // or even 40 for intense glow

    ctx.shadowColor = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
    // Reset shadow settings after drawing
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
  }
  
  
}

function hslToRgb(hsl) {
  const ctx2 = document.createElement("canvas").getContext("2d");
  ctx2.fillStyle = hsl;
  const rgb = ctx2.fillStyle.match(/\d+/g);
  return rgb ? rgb.slice(0, 3).join(",") : "255,255,255";
}

function animate() {

  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0);
  particles.forEach(p => {
    p.update();
    p.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();




