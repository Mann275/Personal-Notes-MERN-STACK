# 🎲 Dice Game

A fun interactive dice guessing game built with **React** and **Styled Components**. Guess the dice roll, rack up points, and test your luck!

---

## 🎮 How to Play

| Step | Action                                                            |
| ---- | ----------------------------------------------------------------- |
| 1️⃣   | Pick a number from **1 to 6** by clicking one of the number boxes |
| 2️⃣   | Click the **dice image** to roll                                  |
| ✅   | Correct guess → earn **that many points**                         |
| ❌   | Wrong guess → **−2 points** deducted                              |

> Click a selected number again to **deselect** it.

---

## ✨ Features

- 🎯 **Number selection** with toggle deselect
- 🎲 **Animated dice** with hover & click effects
- 🏆 **Live score tracker** — turns green when positive, red when negative
- 🔔 **Toast notifications** — win / lose / error messages slide in from bottom-right and auto-dismiss
- 📖 **Rules modal** — blurred overlay popup with spring animation
- 🔄 **Reset button** in the navbar to restart the game
- 📱 **Responsive** clean white UI

---

## 📂 Project Structure

```
src/
├── components/
│   ├── StartGame.jsx      # Landing page with animated dice
│   ├── GamePlay.jsx       # Main game layout & logic
│   ├── TotalScore.jsx     # Score display card
│   ├── NumberSelector.jsx # 1–6 number picker grid
│   ├── RoleDice.jsx       # Clickable dice image
│   └── Rules.jsx          # Modal popup with game rules
├── style/
│   └── Button.js          # Shared Button & OutlineButton components
├── index.css              # Global styles & CSS variables
└── App.jsx                # Root with start/game toggle
```

---

## 🚀 Getting Started

```bash
cd "Dice Game"
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

---
