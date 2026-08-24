const existingButton = document.getElementById("leetcode-share-button");

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
        console.log("URL:", window.location.href);
        console.log("Path:", window.location.pathname);
        console.log("Page title:", document.title);
    });

    document.body.appendChild(button);
}