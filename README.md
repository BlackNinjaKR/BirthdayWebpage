# 🎂 Happy Birthday! 🎈

_An interactive birthday webpage crafted with love, code, and lots of confetti. 🎉🎉_

![Banner](icons/cake.gif)

A fun, customizable, and open-source birthday webpage to celebrate someone's special day! 🎂
Perfect for surprising friends, family, or coworkers with a personal touch — just clone, edit, and share the link.

## 🧁 Features

- 🎵 **Custom birthday music** (autoplay if your browser is cool with that)
- 🎉 **Animated countdown** to the exact birthday moment
- 📸 **Photo memory carousel** because one slide just isn't enough
- 💬 **Heartfelt message cards** from the emotional vault
- 🎈 **Floating emojis**, sparkles, confetti, and surprise clicks
- 💖 **Click-to-hug** button for those moments when you just need it

---
## 🛠️ Tech Stack

- **HTML/CSS/JS** – the usual suspects
- [Swiper.js](https://swiperjs.com/) – for the smooth memory lane scrolling
- [Canvas Confetti](https://github.com/catdad/canvas-confetti) – because static birthdays are boring
- **Particles.js** – to add that dreamy vibe to the background
- Audio via native `<audio>` and some browser-wrangling

---

## 🚀 How to Use

1. Clone the Repository

```bash
git clone https://github.com/BlackNinjaKR/BirthdayWebpage.git
cd BirthdayWebpage
open index.html # or just double-click
```

2. Customize

You need to make changes to `mainpage.html`,`quiz.html`,`countdown.js`, and `script.js`.  
Change:  
  
- Name, greeting, and messages  
- Music
- Add personal images or embed YouTube videos  

  
Also, remember to switch out the cat photos in /photos.  

3. Launch

You can open the HTML file directly in a browser or access it [here](https://birthday-webpage-two.vercel.app/)

---

## 📁 Project Structure

``` bash
birthday-webpage/
├── icons/
├── photos/     #Your personal images go here
├── songs/
├── countdown.css
├── countdown.js
├── index.html  #Countdown page
├── styles.css
├── script.js
├── mainpage.html  #Main Birthday page
├── quiz.css
├── quiz.js
├── quiz.html  #Quiz page
└── README.md
```