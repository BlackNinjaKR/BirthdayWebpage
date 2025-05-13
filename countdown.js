
const birthdayDate = new Date(Date.now() + 10 * 1000); //COMMENT OUT THIS LINE
//const birthdayDate = new Date("2000-00-00T00:00:00Z"); //CHANGE THE BIRTHDAY DATE
const now = new Date();

if (now >= birthdayDate) {
  showBirthdayPopup();     // Show popup immediately
  playBirthdaySong();      // Play the birthday song if the date has passed
} else {
  // Start countdown normally
  updateCountdown();
}

function confettiBurst() {
  console.log("CONFETTI TRIGGERED"); // Debug line
  confetti({
    particleCount: 500,
    spread: 200,
    origin: { y: 0.5 }
  });
}


function showBirthdayPopup() {
  document.getElementById('birthday-popup').classList.remove('hidden');
  document.getElementById("birthday-audio").play();
  confetti(); // Optional: launch some confetti
}

function setAnimationClass(className) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove("shiver-gentle", "shiver-medium", "shiver-intense", "blink");
  
      if (className) {
        className.split(" ").forEach(c => el.classList.add(c));
      }
    });
  }
  
function updateNumber(id, value, diff) {
  const el = document.getElementById(id);

  if (el.textContent != value) {
    el.textContent = value;
    el.classList.remove("flip-down");
    void el.offsetWidth; // Force reflow
    el.classList.add("flip-down");
  }

  el.classList.remove("blink-red");

  if (value === 0) return;

  if (diff <= 10 * 1000 && id === "seconds") {
    el.classList.add("blink-red");
  } else if (diff <= 24 * 60 * 60 * 1000) {
    el.classList.add("blink-red");
  }
}

  

  
  function updateCountdown() {
    const now = new Date();
    const diff = birthdayDate - now;
  
    if (diff <= 0) {
        confettiBurst();
        clearInterval(countdownInterval);
        clearInterval(confettiInterval);
        document.getElementById("birthday-popup").style.display = "flex";
    
        playBirthdaySong(); // 🔊 Play the birthday song
    
        floatEmoji(["🎉", "🎈", "🥳", "🎂"][Math.floor(Math.random() * 4)]);
        return;
    }
    
      
  
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    updateNumber("days", days, diff);
    updateNumber("hours", hours, diff);
    updateNumber("minutes", minutes, diff);
    updateNumber("seconds", seconds, diff);
  }
  
  

// Side confetti burst
function sideConfetti() {
  confetti({
    particleCount: 10,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
  });
  confetti({
    particleCount: 10,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
  });
}

// Final burst when countdown ends
function confettiBurst() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// Shoot side confetti every second
const confettiInterval = setInterval(() => {
  sideConfetti();
}, 300);

function floatEmoji(emoji) {
  const el = document.createElement("div");
  el.textContent = emoji;
  el.classList.add("floating-emoji");

  const left = Math.random() * 90 + 5;
  const jumpHeight = Math.random() * 50 + 45; // 20vh to 40vh
  const riseTime = Math.random() * 0.5 + 0.8; // 0.8s to 1.3s
  const fallTime = Math.random() * 0.5 + 0.6; // 0.6s to 1.1s

  el.style.position = "fixed";
  el.style.left = `${left}%`;
  el.style.bottom = "-3vh"; // Starts below view
  el.style.fontSize = `${Math.random() * 1.2 + 1.8}rem`;
  el.style.opacity = 1;
  el.style.zIndex = 9999;
  el.style.transition = `transform ${riseTime}s ease-out`;

  document.body.appendChild(el);

  // Rise up
  requestAnimationFrame(() => {
    const rotate = Math.random() * 360 - 180;
    el.style.transform = `translateY(-${jumpHeight}vh) rotate(${rotate}deg)`;
  });

  // Fall back down
  setTimeout(() => {
    el.style.transition = `transform ${fallTime}s ease-in, opacity ${fallTime}s ease-out`;
    el.style.transform = `translateY(0) rotate(0deg)`;
    el.style.opacity = 0.3;
  }, riseTime * 1000);

  // Clean up
  setTimeout(() => el.remove(), (riseTime + fallTime) * 1000 + 500);
}


setInterval(() => {
  document.querySelectorAll(".floating-emoji").forEach(el => {
    if (parseFloat(getComputedStyle(el).opacity) < 0.5) {
      el.remove();
    }
  });
}, 5000); // every 5s


  
  document.body.addEventListener('click', (e) => {
    const { clientX: x, clientY: y } = e;
  
    // Trigger only near corners
    const threshold = 80;
    const isCornerClick = (
      (x < threshold && y < threshold) ||                      // Top-left
      (x > window.innerWidth - threshold && y < threshold) ||  // Top-right
      (x < threshold && y > window.innerHeight - threshold) || // Bottom-left
      (x > window.innerWidth - threshold && y > window.innerHeight - threshold) // Bottom-right
    );
  
    if (isCornerClick) {
      heartBurst({ x: x / window.innerWidth, y: y / window.innerHeight });
    }
  });
  
  function heartBurst(origin) {
    confetti({
      particleCount: 80,
      spread: 80,
      origin,
      shapes: ['heart'],
      colors: ['#ff4081', '#ff80ab', '#f8bbd0'],
    });
  }

  document.querySelector("h2").addEventListener("click", () => {
    floatEmoji("✨");
    floatEmoji("💖");
    floatEmoji("🌟");
    floatEmoji("🎉");
    floatEmoji("🎂");
    floatEmoji("🎊");
    floatEmoji("🥳");
    floatEmoji("💖");
    floatEmoji("🌟");
    floatEmoji("✨");
    floatEmoji("💖");
    floatEmoji("🌟");
    floatEmoji("✨");
    floatEmoji("💖");
    floatEmoji("🌟");
    floatEmoji("🎉");
    floatEmoji("🎂");
    floatEmoji("🎊");
    floatEmoji("🥳");
    floatEmoji("💖");
    floatEmoji("🌟");
    floatEmoji("✨");
    floatEmoji("💖");
    floatEmoji("🌟");
  
    // Only play if no birthday audio is already playing
    const birthdayAudio = document.getElementById("birthday-audio");
    if (birthdayAudio && birthdayAudio.paused) {
      playBirthdaySong();
    }
  });
  
  
  

  const magicSound = new Audio("songs/hpbdy.mp3");
  magicSound.volume = 0.5;
  
  // Register audio globally
  if (!window._allAudios) window._allAudios = [];
  window._allAudios.push(magicSound);
  

  const emojiList = ["🎉", "🎈", "💖", "✨", "🎂", "🌟", "🥳"];

  document.querySelectorAll("#countdown > div").forEach(block => {
    block.style.cursor = "pointer";
  
    block.addEventListener("click", (e) => {
      // Get random emoji
      const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  
      // Get position for confetti burst
      const rect = block.getBoundingClientRect();
      const origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      };
  
      // Confetti with emoji
      confetti({
        particleCount: 25,
        spread: 50,
        origin,
        scalar: 1.2,
        ticks: 60,
        shapes: ["text"],
        emoji
      });
  
      // Visual scale effect
      block.classList.add("click-pop");
      setTimeout(() => block.classList.remove("click-pop"), 300);
  
      // Play sound if not already playing
      if (magicSound.paused) {
        magicSound.currentTime = 0;
        magicSound.play();
      }
    });
  });


function emojiBurst(emoji, origin) {
  confetti({
    particleCount: 25,
    spread: 50,
    origin,
    scalar: 1.2,
    ticks: 60,
    shapes: ["text"],
    emoji
  });
}

function playBirthdaySong() {
    // Pause and reset all other known audio instances
    if (!window._allAudios) {
      window._allAudios = [];
    }
  
    // Register the birthday audio if not already
    const birthdayAudio = document.getElementById("birthday-audio");

    // Mark hpbdy_main as currently playing
const isBirthdayPlaying = !birthdayAudio.paused;

birthdayAudio.play().catch((e) => {
  console.log("Autoplay failed:", e);

  document.getElementById('enable-sound').style.display = 'inline-block';
});
// Prevent any other audio from playing if birthday song is active
if (isBirthdayPlaying) return; 


    if (!window._allAudios.includes(birthdayAudio)) {
      window._allAudios.push(birthdayAudio);
    }
  
    // Stop all other audios
    window._allAudios.forEach(audio => {
      if (audio !== birthdayAudio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  
    // Play birthday song
    if (birthdayAudio) {
      birthdayAudio.play().catch((e) => {
        console.log("Autoplay failed:", e);
      });
    }
  }



  // Ensure the "Enable Sound" button works correctly
document.getElementById("enable-sound").addEventListener("click", () => {
  const birthdayAudio = document.getElementById("birthday-audio");

  // Try playing the birthday song again
  birthdayAudio.play().then(() => {
    // Success: hide the button
    document.getElementById("enable-sound").style.display = "none";
  }).catch((err) => {
    console.log("Still can't play audio:", err);
  });
});

document.querySelectorAll('#countdown div').forEach(el => {
  const duration = (Math.random() * 2 + 2).toFixed(2); // 2s to 4s
  const delay = (Math.random() * 2).toFixed(2); // 0s to 2s
  el.style.setProperty('--float-duration', `${duration}s`);
  el.style.setProperty('--float-delay', `${delay}s`);
});
