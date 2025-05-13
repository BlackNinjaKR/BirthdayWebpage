    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // fades out in 0.5s
    });


    // --- FinisherHeader Full Code (Compressed for simplicity) ---
    "use strict";
    (function (t) {
        function calculateTriangleHeight(angle, base) {
            var radians = 0.017453 * Math.abs(angle);
            var slope = Math.tan(radians);
            return Math.ceil(base * slope);
        }
        function parseColor(hex) {
            var c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split("");
                if (c.length === 3) { c = [c[0], c[0], c[1], c[1], c[2], c[2]]; }
                c = "0x" + c.join("");
                return { r: (c >> 16) & 255, g: (c >> 8) & 255, b: 255 & c };
            }
            return { r: 0, g: 0, b: 0 };
        }
        var Particle = function (color, posIndex, o) {
            this.o = o;
            this.r = parseColor(color);
            this.d = this.randomDirection();
            this.h = this.randomShape();
            this.s = Math.abs(this.randomFromRange(this.o.size));
            this.setPosition(posIndex);
            this.vx = this.randomFromRange(this.o.speed.x) * this.randomDirection();
            this.vy = this.randomFromRange(this.o.speed.y) * this.randomDirection();
        };
        Particle.prototype = {
            setPosition: function (posIndex) {
                var pos = this.randomPosition();
                if (posIndex == 3) { this.x = pos.x + pos.halfWidth; this.y = pos.y; }
                else if (posIndex == 2) { this.x = pos.x; this.y = pos.y + pos.halfHeight; }
                else if (posIndex == 1) { this.x = pos.x + pos.halfWidth; this.y = pos.y + pos.halfHeight; }
                else { this.x = pos.x; this.y = pos.y; }
            },
            randomPosition: function () {
                var hw = this.o.c.w / 2, hh = this.o.c.h / 2;
                return { x: Math.random() * hw, y: Math.random() * hh, halfWidth: hw, halfHeight: hh };
            },
            randomFromRange: function (range) {
                if (range.min === range.max) return range.min;
                return Math.random() * (range.max - range.min) + range.min;
            },
            randomDirection: function () { return Math.random() > 0.5 ? 1 : -1; },
            randomShape: function () {
                var s = this.o.shapes;
                return s[Math.floor(Math.random() * s.length)];
            },
            getRGBA: function (color, alpha) {
                return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
            },
            animate: function (ctx, width, height) {
                if (this.o.size.pulse) {
                    this.s += this.o.size.pulse * this.d;
                    if (this.s > this.o.size.max || this.s < this.o.size.min) { this.d *= -1; }
                    this.s = Math.abs(this.s);
                }
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
    
                ctx.beginPath();
                if (this.o.blending && this.o.blending !== "none") { ctx.globalCompositeOperation = this.o.blending; }
                var centerColor = this.getRGBA(this.r, this.o.opacity.center);
                var edgeColor = this.getRGBA(this.r, this.o.opacity.edge);
    
                var radius = { c: this.s / 2, t: 0.577 * this.s, s: 0.707 * this.s }[this.h] || this.s;
                var gradient = ctx.createRadialGradient(this.x, this.y, 0.01, this.x, this.y, radius);
                gradient.addColorStop(0, centerColor);
                gradient.addColorStop(1, edgeColor);
                ctx.fillStyle = gradient;
    
                var halfSize = this.s / 2;
                if (this.h === "c") {
                    ctx.arc(this.x, this.y, halfSize, 0, 2 * Math.PI);
                } else if (this.h === "s") {
                    ctx.moveTo(this.x - halfSize, this.y - halfSize);
                    ctx.lineTo(this.x + halfSize, this.y - halfSize);
                    ctx.lineTo(this.x + halfSize, this.y + halfSize);
                    ctx.lineTo(this.x - halfSize, this.y + halfSize);
                } else if (this.h === "t") {
                    var heightTriangle = calculateTriangleHeight(30, halfSize);
                    ctx.moveTo(this.x - halfSize, this.y + heightTriangle);
                    ctx.lineTo(this.x + halfSize, this.y + heightTriangle);
                    ctx.lineTo(this.x, this.y - 2 * heightTriangle);
                }
                ctx.closePath();
                ctx.fill();
            }
        };
    
        var FinisherHeader = function (options) {
            this.c = document.createElement("canvas");
            this.x = this.c.getContext("2d");
            this.c.setAttribute("id", "finisher-canvas");
            this.getElement(options.className).appendChild(this.c);
            var resizeTimeout;
            t.addEventListener("resize", () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(this.resize.bind(this), 150);
            }, false);
            this.init(options);
            t.requestAnimationFrame(this.animate.bind(this));
        };
        FinisherHeader.prototype = {
            getElement: function (className) {
                var elements = document.getElementsByClassName(className || "finisher-header");
                if (!elements.length) throw new Error("No .finisher-header element found");
                return elements[0];
            },
            resize: function () {
                var el = this.getElement(this.o.className);
                this.o.c = { w: el.clientWidth, h: el.clientHeight };
                this.c.width = this.o.c.w;
                this.c.height = this.o.c.h;
                var skewOffset = calculateTriangleHeight(this.o.skew, this.o.c.w / 2);
                var transformStyle = `skewY(${this.o.skew}deg) translateY(-${skewOffset}px)`;
                this.c.style.cssText = `position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;
                    -webkit-transform:${transformStyle};transform:${transformStyle};
                    outline:1px solid transparent;
                    background-color:rgba(${this.bc.r},${this.bc.g},${this.bc.b},1);`;
            },
            init: function (options) {
                this.o = options;
                this.bc = parseColor(this.o.colors.background);
                this.ps = [];
                this.resize();
                this.createParticles();
            },
            createParticles: function () {
                var i = 0;
                this.ps = [];
                this.o.ac = t.innerWidth < 600 && this.o.count > 5 ? Math.round(this.o.count / 2) : this.o.count;
                for (var s = 0; s < this.o.ac; s++) {
                    var p = new Particle(this.o.colors.particles[i], s % 4, this.o);
                    if (++i >= this.o.colors.particles.length) i = 0;
                    this.ps[s] = p;
                }
            },
            animate: function () {
                t.requestAnimationFrame(this.animate.bind(this));
                this.x.clearRect(0, 0, this.o.c.w, this.o.c.h);
                for (var i = 0; i < this.o.ac; i++) {
                    this.ps[i].animate(this.x, this.o.c.w, this.o.c.h);
                }
            }
        };
        t.FinisherHeader = FinisherHeader;
    })(window);
    
    // --- Initialization of Background ---
    new FinisherHeader({
      count: 60,
      size: { min: 20, max: 50, pulse: 0 },
      speed: { x: { min: -0.5, max: 0.5 }, y: { min: -0.5, max: 0.5 } },
      colors: {
        background: "#fefefe",
        particles: ["#FF69B4", "#FF1493", "#DB7093", "#FFC0CB"]
      },
      blending: "overlay",
      opacity: { center: 0.7, edge: 0 },
      skew: -5,
      shapes: ["c", "s", "t"]
    });
    
    
    
        // --- Music Player Control (Perfect Loop & No Bugs) ---
    
        const music = document.getElementById('bg-music');
        const musicButton = document.getElementById('music-toggle');
        const musicIcon = document.getElementById('music-icon');
    
        const playlist = [
            "songs/song1.mp3",
            "songs/song2.mp3",
            "songs/song4.mp3",
            "songs/song5.mp3",
            "songs/song6.mp3",
            "songs/song7.mp3",
            "songs/song8.mp3",
            "songs/song9.mp3",
            "songs/song10.mp3"
        ];
    
        let currentSongIndex = 0;
        let isMusicStarted = false;
    
        function loadSong(index) {
            music.src = playlist[index];
            music.load(); // force reload new src
        }
    
        function playSong() {
            music.play().then(() => {
                musicIcon.src = "icons/festival.gif";
            }).catch(err => {
                console.error("Play error:", err);
            });
        }
    
        function startMusic() {
            if (!isMusicStarted) {
                loadSong(currentSongIndex);
                playSong();
                isMusicStarted = true;
                document.removeEventListener('click', startMusic);
            }
        }
    
        musicButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (music.paused) {
                playSong();
            } else {
                music.pause();
                musicIcon.src = "icons/festival.png";
            }
        });

        music.volume = 0.5;
    
        music.addEventListener('ended', () => {
            currentSongIndex = (currentSongIndex + 1) % playlist.length; // Loop playlist
            loadSong(currentSongIndex);
    
            // Wait for it to be ready, THEN play
            music.addEventListener('canplay', function handler() {
                music.removeEventListener('canplay', handler); // Remove this one-time listener
                playSong();
            });
        });
    
        window.addEventListener('load', () => {
            document.addEventListener('click', startMusic);
        });
    
    
        





        const cake = document.getElementById('cake');
        const splash = document.getElementById('splash-screen');
  const mainContent = document.getElementById('main-content');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const balloonContainer = document.getElementById('balloon-container');

  const myConfetti = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true
  });

  let confettiInterval;

  function startConfettiSpray() {
    const brightColors = ['#ffffff', '#ffe57f', '#ff8a80', '#82b1ff', '#69f0ae', '#ffd740'];
  
    confettiInterval = setInterval(() => {
      myConfetti({
        particleCount: 7,
        angle: 60,
        spread: 70,
        startVelocity: 45,
        colors: brightColors,
        origin: { x: 0, y: 0.6 }
      });
      myConfetti({
        particleCount: 7,
        angle: 120,
        spread: 70,
        startVelocity: 45,
        colors: brightColors,
        origin: { x: 1, y: 0.6 }
      });
    }, 100);
  }
  

  function stopConfettiSpray() {
    clearInterval(confettiInterval);
  }

  function releaseBalloons() {
    for (let i = 0; i < 15; i++) {
      const balloon = document.createElement('div');
      balloon.classList.add('balloon');
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
      balloonContainer.appendChild(balloon);

      setTimeout(() => balloon.remove(), 5000);
    }
  }

  // Auto-release everything
  startConfettiSpray();

  setTimeout(() => {
    releaseBalloons();
  }, 2500); // Balloons at 2.5 seconds

  setTimeout(() => {
    stopConfettiSpray();
    splash.style.animation = 'fadeOut 1s forwards';
    setTimeout(() => {
      splash.style.display = 'none';
      mainContent.style.display = 'block';
    }, 1000);
  }, 5000); // Splash fades at 5 seconds

  // Also allow clicking anywhere to skip early
  splash.addEventListener('click', () => {
    stopConfettiSpray();
    splash.style.animation = 'fadeOut 1s forwards';
    setTimeout(() => {
      splash.style.display = 'none';
      mainContent.style.display = 'block';
    }, 1000);
  });









        
  const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    speed: 3000, // default speed (full speed)
    spaceBetween: 30,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true,
    freeModeMomentum: false,
    grabCursor: true,
    on: {
      progress() {
        this.slides.forEach((slide) => {
          const progress = slide.progress;
          const absProgress = Math.abs(progress);
          const brightness = 1 - Math.min(absProgress * 0.5, 0.75);
          slide.style.filter = `brightness(${brightness})`;
          slide.style.zIndex = `${100 - Math.floor(absProgress * 10)}`;
        });
      },
      setTransition(duration) {
        this.slides.forEach((slide) => {
          slide.style.transition = `filter ${duration}ms ease`;
        });
      },
    },
  });
  
  let isMouseDown = false;
  let resumeTimeout;
  let rampInterval;
  
  function gradualResumeAutoplay() {
    const speeds = [10000, 5000, 3000]; // slow to full
    let i = 0;
  
    rampInterval = setInterval(() => {
      if (i >= speeds.length) {
        clearInterval(rampInterval);
      } else {
        swiper.params.speed = speeds[i];
        swiper.autoplay.start();
        i++;
      }
    }, 800); // ramp every 800ms
  }
  
  document.querySelectorAll('.swiper-slide').forEach(slide => {
    // Resume logic
    slide.addEventListener('mousedown', () => {
      isMouseDown = true;
      swiper.params.speed = 10000; // slow down drastically

      clearTimeout(resumeTimeout);
      clearInterval(rampInterval);
    });
  
    slide.addEventListener('mouseleave', () => {
      if (!isMouseDown) {
        clearTimeout(resumeTimeout);
        clearInterval(rampInterval);
        resumeTimeout = setTimeout(gradualResumeAutoplay, 2000);
      }
    });
  
    document.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        clearTimeout(resumeTimeout);
        clearInterval(rampInterval);
        resumeTimeout = setTimeout(gradualResumeAutoplay, 2000);
      }
    });
  
    // SHINE ANIMATION
    let animId;
    let startTime;
    let duration = 900;
    let isReversing = false;
    let startProgress = 0;
    let endProgress = 1;
  
    const easeInOut = t =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  
    const updateShine = timestamp => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let rawProgress = Math.min(elapsed / duration, 1);
      let easedProgress = easeInOut(rawProgress);
      let progress = isReversing
        ? startProgress - easedProgress * (startProgress - endProgress)
        : startProgress + easedProgress * (endProgress - startProgress);
  
      const translateX = -100 + progress * 220;
      slide.style.setProperty('--shine-x', `${translateX}%`);
      slide.style.setProperty('--shine-visible', '1');
  
      if (rawProgress >= 1) {
        return cancelAnimationFrame(animId);
      }
  
      animId = requestAnimationFrame(updateShine);
    };
  
    slide.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animId);
      isReversing = false;
      startProgress = parseFloat(getComputedStyle(slide).getPropertyValue('--shine-x')) || -100;
      startProgress = (startProgress + 100) / 220;
      endProgress = 1;
      startTime = null;
      animId = requestAnimationFrame(updateShine);
    });
  
    slide.addEventListener('mouseleave', () => {
      cancelAnimationFrame(animId);
      isReversing = true;
      startProgress = parseFloat(getComputedStyle(slide).getPropertyValue('--shine-x')) || 120;
      startProgress = (startProgress + 100) / 220;
      endProgress = 0;
      startTime = null;
      animId = requestAnimationFrame(updateShine);
    });
  });
  
          

          

          
          



let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
const sparkles = [];

let isWindowActive = true;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  

// Detect when user leaves or returns
window.addEventListener('blur', () => isWindowActive = false);
window.addEventListener('focus', () => isWindowActive = true);
window.addEventListener('mouseleave', () => isWindowActive = false);
window.addEventListener('mouseenter', () => isWindowActive = true);

function createSparkle(x, y) {
  const el = document.createElement('div');
  el.className = 'sparkle';

  const size = Math.random() * 2 + 1.5;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  
  el.style.background = `hsl(${Math.random() * 60}, 100%, 85%)`;

  document.body.appendChild(el);

  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 0.6 + 0.3;
  const velocity = {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed
  };

  const life = 700 + Math.random() * 200;
  sparkles.push({ el, velocity, life });
}

function sparkleLoop() {
  if (isWindowActive) {
    for (let i = 0; i < 3; i++) {
      createSparkle(mouseX, mouseY);
    }
  }
  setTimeout(sparkleLoop, 20);
}

function animateSparkles() {
  for (let i = 0; i < sparkles.length; i++) {
    const s = sparkles[i];
    s.life -= 16;

    if (s.life <= 0) {
      s.el.remove();
      sparkles.splice(i, 1);
      i--;
      continue;
    }

    const rect = s.el.getBoundingClientRect();
    const x = rect.left + s.velocity.x;
    const y = rect.top + s.velocity.y;

    s.el.style.left = `${x}px`;
    s.el.style.top = `${y}px`;
    s.el.style.opacity = s.life / 1300;
  }
  requestAnimationFrame(animateSparkles);
}

sparkleLoop();
animateSparkles();







let activeHearts = [];

document.addEventListener('click', (e) => {
  if (activeHearts.length > 50) return; // Limit active hearts

  const heart = document.createElement('div');
  heart.className = 'heart-sparkle';

  const size = Math.random() * 6 + 8;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${e.pageX - size / 2}px`;
  heart.style.top = `${e.pageY - size / 2}px`;
  heart.style.background = `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;

  heart.style.transition = 'all 0.8s ease-out';
  document.body.appendChild(heart);

  const dx = (Math.random() - 0.5) * 100;
  const dy = (Math.random() - 1) * 150;

  requestAnimationFrame(() => {
    heart.style.transform += ` translate(${dx}px, ${dy}px) scale(0.7)`;
    heart.style.opacity = '0';
  });

  activeHearts.push(heart);

  setTimeout(() => {
    heart.remove();
    activeHearts = activeHearts.filter(h => h !== heart);
  }, 900);
});







  const hugBtn = document.getElementById('hugBtn');
  const hugOverlay = document.getElementById('hugOverlay');
  
  hugBtn.addEventListener('click', () => {
    hugOverlay.style.display = 'flex';
  
    // Optional vibration
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  
    // Hide after 4s
    setTimeout(() => {
      hugOverlay.style.display = 'none';
    }, 4000);
  });
  
  



    particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 70,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#eeeeee" // soft white "stars"
    },
    "shape": {
      "type": "circle",
    },
    "opacity": {
      "value": 0.7,
      "random": true,
    },
    "size": {
      "value": 2,
      "random": true,
    },
    "move": {
      "enable": true,
      "speed": 0.5,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": false
      },
      "onclick": {
        "enable": false
      }
    }
  },
  "retina_detect": true
});




    document.addEventListener('DOMContentLoaded', function () {
      const cards = document.querySelectorAll('.message-card');
    
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.2
      });
    
      cards.forEach(card => {
        observer.observe(card);
      });
    });
    


    window.addEventListener("load", () => {
      const msg = document.querySelector('.message');
      setTimeout(() => {
        msg.style.animation = 'floatIn 2s ease-out forwards, glowPulse 3s infinite alternate';
      }, 1500); // delay message reveal by 1.5s
    });
    
    const messageLines = [
      "Lorem ipsum dolor sit amet. ",
      "Et autem iusto ab ipsa labore ut quia adipisci.\n",
      "Et modi aspernatur vel cumque earum aut distinctio similique eos voluptatem galisum ut placeat dolore.\n",
      "\n",
      "Sed molestiae quia ex architecto quam ab totam voluptatem vel omnis magnam sed molestias repellat in optio accusantium quo repellendus voluptates?",
      "Non atque velit ad iure velit et galisum porro hic consequatur nostrum non error perferendis.\n",
      "\n",
      "Et dolorum harum nam tempore enim qui accusantium excepturi est voluptatum laboriosam et ratione ratione.",
      "Sit quis inventore qui doloremque consequatur et voluptate delectus ex quibusdam deleniti nam repellendus saepe.",
      "\n",
      "BlackNinjaKR💛"
    ];//REPLACE THIS MESSAGE WITH YOUR MESSAGE!
    
    const typingSpeed = 40;      // ms per character
    const lineDelay = 800;       // ms between lines
    let lineIndex = 0;
    let charIndex = 0;
    const typingText = document.getElementById("typing-text");
    
    function typeLine() {
      if (lineIndex >= messageLines.length) return;
    
      const currentLine = messageLines[lineIndex];
    
      if (charIndex < currentLine.length) {
        typingText.innerHTML += currentLine.charAt(charIndex);
        charIndex++;
        setTimeout(typeLine, typingSpeed);
      } else {
        typingText.innerHTML;
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, lineDelay);
      }
    }
    
    window.addEventListener("load", () => {
      setTimeout(typeLine, 1000); // Start typing after 1 second delay
    });
    