// src/utils/captureWithWatermark.ts
import { toPng } from "html-to-image";

type CaptureOptions = {
  element: HTMLElement;
  fileName?: string;
  disableWatermark?: boolean;
};

export async function captureWithWatermark({
  element,
  fileName = "shared-image.png",
  disableWatermark = false,
}: CaptureOptions) {
  if (!element) return;

  const baseImage = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.src = baseImage;
  await new Promise((res) => (img.onload = res));

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // ===== WATERMARK =====
  if (!disableWatermark) {
    const padding = 24;

    // 🔥 DIBESARKAN
    const baseSize = Math.min(canvas.width, canvas.height) * 0.22;
    const watermarkWidth = Math.max(110, Math.min(baseSize, 240));

    const isBright = isBrightBackground(ctx, padding, padding);

    const watermark = new Image();
    watermark.src = isBright
      ? "/aia_vitality_red.svg"
      : "/aia_vitality_white.svg";

    await new Promise((res) => (watermark.onload = res));

    const ratio = watermark.width / watermark.height;
    const watermarkHeight = watermarkWidth / ratio;

    ctx.globalAlpha = 0.9;
    ctx.drawImage(watermark, padding, padding, watermarkWidth, watermarkHeight);
    ctx.globalAlpha = 1;
  }

  const finalImage = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = finalImage;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function isBrightBackground(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  sampleSize = 20,
) {
  const imageData = ctx.getImageData(x, y, sampleSize, sampleSize).data;

  let totalBrightness = 0;
  let count = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    totalBrightness += brightness;
    count++;
  }

  return totalBrightness / count > 200;
}
