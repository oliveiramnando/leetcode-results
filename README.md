# LeetCode Share

Share your LeetCode results with friends in a clean, game-style format inspired by daily puzzle sharing.

```text
LeetCode - Stone Game VIII
🔴 Hard
🟥 🟨 🟩
Solved in 3 attempts
```

LeetCode Share is a lightweight Chrome extension that generates a shareable summary of your LeetCode attempts and copies it directly to your clipboard.

## Features

* One-click sharing from LeetCode problem pages
* Displays the problem name and difficulty
* Tracks your attempts for the current day
* Converts submission results into easy-to-read emoji blocks
* Stops counting attempts after your first accepted solution
* Copies the formatted result directly to your clipboard
* Works without requiring a separate account
* No backend or external database

## Result Types

Submission results are represented with different colored blocks:

| Result                | Emoji |
| --------------------- | ----- |
| Accepted              | 🟩    |
| Wrong Answer          | 🟥    |
| Time Limit Exceeded   | 🟨    |
| Runtime Error         | 🟧    |
| Memory Limit Exceeded | 🟪    |
| Compile Error         | ⬛     |
| Unknown               | ⬜     |

For example:

```text
LeetCode - Two Sum
🟢 Easy
🟥 🟥 🟩
Solved in 3 attempts
```

## How It Works

LeetCode Share runs directly on LeetCode problem pages.

When you click **Share LC**, the extension:

1. Determines the current problem from the page URL.
2. Retrieves the problem title and difficulty from LeetCode.
3. Retrieves your recent submissions for that problem.
4. Filters the submissions to attempts made today.
5. Orders the attempts chronologically.
6. Stops at the first accepted submission.
7. Converts each result into an emoji.
8. Generates a shareable result.
9. Copies the result to your clipboard.

The extension communicates directly with LeetCode's GraphQL API using your existing signed-in browser session.

## Tech Stack

* TypeScript
* Chrome Extension Manifest V3
* Chrome Content Scripts
* LeetCode GraphQL API
* Browser Clipboard API

No frontend framework, backend, or database is required.

## Project Structure

```text
leetcode_results/
├── dist/
│   └── content.js
├── src/
│   └── content.ts
├── manifest.json
├── leetcode_share.png
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Local Development

### Prerequisites

* Google Chrome
* Node.js
* npm

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd leetcode_results
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the extension

```bash
npm run build
```

This compiles the TypeScript source into the `dist/` directory.

### 4. Load the extension into Chrome

Open:

```text
chrome://extensions
```

Then:

1. Enable **Developer mode**.
2. Click **Load unpacked**.
3. Select the `leetcode_results` directory.

### 5. Test it

Open any LeetCode problem page while signed in.

You should see a **Share LC** button.

Solve or submit the problem, then click the button to copy your result.

## Example

Suppose your attempts were:

```text
Wrong Answer
Time Limit Exceeded
Accepted
```

LeetCode Share generates:

```text
LeetCode - Stone Game VIII
🔴 Hard
🟥 🟨 🟩
Solved in 3 attempts
```

Any submissions made after the first accepted solution are ignored so that the shared result represents the attempts required to solve the problem.

## Privacy

LeetCode Share does not operate its own backend and does not send your LeetCode data to the developer.

The extension accesses only the information needed to generate your result, including:

* Current problem
* Problem difficulty
* Submission status
* Submission timestamp

This information is processed locally in your browser.

LeetCode Share does not sell user data or use it for advertising, analytics, lending, or unrelated purposes.

## Permissions

The extension runs on:

```text
https://leetcode.com/problems/*
```

This access is necessary to:

* Display the Share LC button on LeetCode problem pages
* Determine the current problem
* Communicate with LeetCode's API to retrieve the information required to generate a result

## Motivation

Daily games such as Wordle make it easy to share results with friends without revealing the answer.

LeetCode Share brings a similar experience to coding problems: a compact way to show what you solved, how difficult it was, and how many attempts it took.

## Roadmap

Potential future improvements include:

* Share preview before copying
* Daily Challenge detection
* Optional spoiler-free mode
* Include or hide problem names
* Native share support
* Shareable image cards
* Improved loading and error states
* Additional customization options

## Disclaimer

LeetCode Share is an independent project and is not affiliated with, endorsed by, or officially associated with LeetCode.

LeetCode and related trademarks belong to their respective owners.

## License

MIT
