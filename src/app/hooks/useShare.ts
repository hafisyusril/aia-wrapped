// hooks/useShare.ts
export function useShare() {
  return async (payload: { title: string; text: string }) => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.text,
          url,
        });
        return;
      } catch (error) {
        console.log("Share cancelled", error);
      }
    }

    // Fallback copy link
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } else {
        // Ultimate fallback (old browsers)
        fallbackCopyText(url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      alert("Failed to copy link");
    }
  };
}

function fallbackCopyText(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
