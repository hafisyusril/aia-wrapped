// hooks/useShare.ts
export function useShare() {
  return (payload: { title: string; text: string }) => {
    if (navigator.share) {
      navigator.share({
        ...payload,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
}
