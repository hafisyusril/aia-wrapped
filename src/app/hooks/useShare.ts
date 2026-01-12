import { downloadNodeAsImage } from "../utils/downloadNodeAsImage";

interface SharePayload {
  title: string;
  text: string;
}

export function useShare() {
  const share = async (payload: SharePayload) => {
    const url = window.location.href;

    // Primary: Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.text,
          url,
        });
        return;
      } catch (err: any) {
        // user cancel → NORMAL
        if (err?.name === "AbortError") return;
        console.error("Share failed:", err);
      }
    }

    // Fallback: Copy link
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        fallbackCopyText(url);
      }
      alert("Link copied to clipboard!");
    } catch {
      alert("Failed to copy link");
    }
  };

  const downloadStory = async (elementId: string) => {
    const node = document.getElementById(elementId);
    if (!node) {
      console.error("Story element not found");
      return;
    }

    await downloadNodeAsImage(node, "aia-vitality-story.png");
  };

  return {
    share,
    downloadStory,
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
