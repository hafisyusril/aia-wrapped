import html2canvas from "html2canvas";

export async function downloadNodeAsImage(
  node: HTMLElement,
  fileName = "aia-vitality-wrapped.png"
) {
  const canvas = await html2canvas(node, {
    scale: 2, // biar tajam
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
