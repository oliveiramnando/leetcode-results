"use strict";
const existingButton = document.getElementById("leetcode-results-button");
if (!existingButton) {
    const button = document.createElement("button");
    button.id = "leetcode-results-button";
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
        console.log("LeetCode Share Workes");
    });
    document.body.appendChild(button);
}
