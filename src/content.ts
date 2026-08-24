const existingButton = document.getElementById("leetcode-share-button");

function getProblemSlug(): string | null {
    const parts = window.location.pathname.split("/");

    if (parts[1] !== "problems") {
        return null;
    }

    return parts[2] || null;
}

function getProblemTitle(): string {
    return document.title.replace(" - LeetCode", "");
}

function getProblemDifficulty(): string | null {
    const difficultyElement = document.querySelector(
        '[class*="text-difficulty-"]'
    );

    return difficultyElement?.textContent?.trim() || null;
}

interface ProblemInfo {
    slug: string;
    title: string;
    difficulty: string | null;
}

function getProblemInfo(): ProblemInfo | null {
    const slug = getProblemSlug();

    if (!slug) {
        return null;
    }

    return {
        slug,
        title: getProblemTitle(),
        difficulty: getProblemDifficulty(),
    };
}

interface Attempt {
    status: string;
    date: string;
}

function getAttempts(): Attempt[] {
    const rows = [
        ...document.querySelectorAll<HTMLAnchorElement>(
            'a[href*="/submissions/"]'
        ),
    ];

    const statuses = [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Runtime Error",
        "Memory Limit Exceeded",
        "Compile Error",
    ];

    return rows.map((row) => {
        const columns = row.children[0]?.children;

        if (!columns || columns.length < 2) {
            return {
                status: "Unknown",
                date: "",
            };
        }

        const statusAndDate = columns[1].textContent?.trim() ?? "";

        const status =
            statuses.find((s) => statusAndDate.startsWith(s)) ?? "Unknown";

        const date = statusAndDate.replace(status, "").trim();

        return {
            status,
            date,
        };
    });
}

function getTodaysAttempts(attempts: Attempt[]): Attempt[] {
    const today = new Date();

    return attempts.filter((attempt) => {
        const dateText = attempt.date.toLowerCase();

        if (
            dateText.includes("second") ||
            dateText.includes("minute") ||
            dateText.includes("hour") ||
            dateText === "just now"
        ) {
            return true;
        }

        const attemptDate = new Date(attempt.date);

        if (Number.isNaN(attemptDate.getTime())) {
            return false;
        }

        return (
            attemptDate.getFullYear() === today.getFullYear() &&
            attemptDate.getMonth() === today.getMonth() &&
            attemptDate.getDate() === today.getDate()
        );
    });
}

function statusToEmoji(status: string): string {
    switch (status) {
        case "Accepted":
            return "🟩";
        case "Wrong Answer":
            return "🟥";
        case "Time Limit Exceeded":
            return "🟨";
        case "Runtime Error":
            return "🟧";
        case "Memory Limit Exceeded":
            return "🟪";
        case "Compile Error":
            return "⬛";
        default:
            return "⬜";
    }
}

if (!existingButton) {
    const button = document.createElement("button");

    button.id = "leetcode-share-button";
    button.textContent = "Share LC";

    Object.assign(button.style, {
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: "99999",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
    });

    button.addEventListener("click", () => {
        const problem = getProblemInfo();

        const attempts = getAttempts();
        const todaysAttempts = getTodaysAttempts(attempts);

        const chronologicalAttempts = [...todaysAttempts].reverse();

        const result = chronologicalAttempts
            .map((attempt) => statusToEmoji(attempt.status))
            .join(" ");

        console.log("Problem:", problem);
        console.log("Today's attempts:", chronologicalAttempts);
        console.log("Result:", result);
    });

    document.body.appendChild(button);
}