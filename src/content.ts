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
    timestamp: number;
}

async function getAttempts(slug: string): Promise<Attempt[]> {
    const response = await fetch("https://leetcode.com/graphql/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            operationName: "submissionList",
            variables: {
                offset: 0,
                limit: 20,
                questionSlug: slug,
            },
            query: `
                query submissionList(
                    $offset: Int!,
                    $limit: Int!,
                    $questionSlug: String!
                ) {
                    questionSubmissionList(
                        offset: $offset,
                        limit: $limit,
                        questionSlug: $questionSlug
                    ) {
                        submissions {
                            id
                            statusDisplay
                            lang
                            timestamp
                        }
                    }
                }
            `,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch submissions: ${response.status}`
        );
    }

    const data = await response.json();

    const submissions =
        data.data?.questionSubmissionList?.submissions ?? [];

    return submissions.map((submission: any) => ({
        status: submission.statusDisplay,
        timestamp: Number(submission.timestamp),
    }));
}

function getTodaysAttempts(attempts: Attempt[]): Attempt[] {
    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ).getTime();

    const startOfTomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
    ).getTime();

    return attempts.filter((attempt) => {
        const attemptTime = attempt.timestamp * 1000;

        return (
            attemptTime >= startOfToday &&
            attemptTime < startOfTomorrow
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

function generateShareText(
    problem: ProblemInfo,
    attempts: Attempt[]
): string {
    const result = attempts
        .map((attempt) => statusToEmoji(attempt.status))
        .join(" ");

    const attemptWord = attempts.length === 1 ? "attempt" : "attempts";

    return `LeetCode

${problem.title}

${result}

Solved in ${attempts.length} ${attemptWord}`;
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

    button.addEventListener("click", async () => {
        const problem = getProblemInfo();

        if (!problem) {
            console.error("Could not find problem information.");
            return;
        }

        const attempts = await getAttempts(problem.slug);
        const todaysAttempts = getTodaysAttempts(attempts);

        const chronologicalAttempts = [...todaysAttempts].reverse();

        if (chronologicalAttempts.length === 0) {
            console.log("No attempts found for today.");
            return;
        }

        const shareText = generateShareText(
            problem,
            chronologicalAttempts
        );

        try {
            await navigator.clipboard.writeText(shareText);

            console.log("Copied:");
            console.log(shareText);

            button.textContent = "Copied!";

            setTimeout(() => {
                button.textContent = "Share LC";
            }, 1500);
        } catch (error) {
            console.error("Failed to copy result:", error);
        }
    });

    document.body.appendChild(button);
}