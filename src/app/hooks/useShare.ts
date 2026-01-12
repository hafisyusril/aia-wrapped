import { downloadNodeAsImage } from "../utils/downloadNodeAsImage";

interface SharePayload {
  title: string;
  text: string;
}

export function useShare() {
  const share = async (payload: SharePayload) => {
    if (!navigator.share) {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
      return;
    }

    try {
      await navigator.share({
        ...payload,
        url: window.location.href,
      });
    } catch (err: any) {
      // user cancel → NORMAL
      if (err?.name === "AbortError") return;
      console.error("Share failed:", err);
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
