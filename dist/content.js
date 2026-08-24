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
        const slug = getProblemSlug();
        const title = getProblemTitle();
        const difficulty = getProblemDifficulty();
        console.log("Slug:", slug);
        console.log("Title:", title);
        console.log("Difficulty:", difficulty);
    });
    document.body.appendChild(button);
}
