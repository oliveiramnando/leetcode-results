"use strict";
const existingButton = document.getElementById("leetcode-share-button");
function getProblemSlug() {
    const parts = window.location.pathname.split("/");
    if (parts[1] !== "problems") {
        return null;
    }
    return parts[2] || null;
}
function getProblemTitle() {
    return document.title.replace(" - LeetCode", "");
}
function getProblemDifficulty() {
    const difficultyElement = document.querySelector('[class*="text-difficulty-"]');
    return difficultyElement?.textContent?.trim() || null;
}
function getProblemInfo() {
    const slug = getProblemSlug();
    const difficulty = getProblemDifficulty();
    if (!slug || !difficulty) {
        return null;
    }
    return {
        slug,
        title: getProblemTitle(),
        difficulty,
    };
}
function getAttempts() {
    const rows = [
        ...document.querySelectorAll('a[href*="/submissions/"]'),
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
        const status = statuses.find((s) => statusAndDate.startsWith(s)) ?? "Unknown";
        const date = statusAndDate.replace(status, "").trim();
        return {
            status,
            date,
        };
    });
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
        console.log("Problem:", problem);
        console.log("Attempts:", attempts);
    });
    document.body.appendChild(button);
}
