# Guess The Odds 🎲

**Play it here: https://guess-the-odds.onrender.com** (free server, the first load can take ~30s if nobody played for a while)

A daily guessing game. Every day there are 2 new questions like "what are the odds of being dealt a royal flush?", and you guess with a slider that goes from 1 in 1 to 1 in a trillion.

The closer you are, the more points you get. Being exactly right gives 100, being 10 times off gives 60, and 100 times off gives 20. After each guess you see the real odds and how they're calculated. At the end you get your score, your streak, and a share button with emojis (🟩 🟨 🟥), like Wordle.

Everyone gets the same questions on the same day, and they change at midnight UTC. All the answers are exact math (cards, dice, lotteries, birthdays…), so no "odds of being hit by lightning" with numbers that change depending on the source.

## Run it

You need Node.js. Start the backend:

```
cd guess-the-odds-backend
npm install
npm start
```

Then the frontend, in another terminal from the root folder:

```
npm install
npm run dev
```

Open http://localhost:5173.

For production it's a single server: `npm run build` builds the frontend, then `npm start` runs Express, which serves the game and the API. `render.yaml` deploys it on Render's free plan.

## How it works

The frontend is React with Vite. The backend is Express with SQLite, and the questions live in `guess-the-odds-backend/questions.json`. They're loaded into the database when the server starts.

`GET /api/today` returns the day number and the 2 questions, without the answers. `POST /api/answer` takes a question id and a guess, and sends back the real odds, the explanation and the score. Results and streak are saved in localStorage, so no account is needed.

The score tests run with `npm test` in the backend folder.
