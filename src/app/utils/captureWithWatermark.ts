// src/utils/captureWithWatermark.ts
import { toPng } from "html-to-image";

type CaptureOptions = {
  element: HTMLElement;
  fileName?: string;
  disableWatermark?: boolean;
  isBrightText?: boolean;
};

export async function captureWithWatermark({
  element,
  fileName = "shared-image.png",
  disableWatermark = false,
  isBrightText = false,
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

    const isBrightOnTop = isBrightBackground(ctx, padding, padding, 100, 50);

    const watermark = new Image();
    watermark.src = isBrightOnTop ? "/aia-new-red.svg" : "/aia-new-white.svg";

    await new Promise((res) => (watermark.onload = res));

    let ratio = watermark.width / watermark.height;
    if (!ratio || !isFinite(ratio)) {
      ratio = 4; // AIA Vitality logo is wide, fallback to a sensible aspect ratio
    }
    const watermarkHeight = watermarkWidth / ratio;

    ctx.globalAlpha = 0.9;
    ctx.drawImage(watermark, padding, padding, watermarkWidth, watermarkHeight);
    ctx.globalAlpha = 1;

    // Add text lines
    const textLine1 = "aia.id/aiavitality";
    const textLine2 =
      "PT AIA Financial berizin dan diawasi oleh Otoritas Jasa Keuangan";
    const textPaddingX = padding;
    const textPaddingY = padding;

    // Measure text 2
    ctx.font = `12px Arial, sans-serif`;
    const textMetrics2 = ctx.measureText(textLine2);
    const textHeight2 =
      textMetrics2.actualBoundingBoxAscent +
      textMetrics2.actualBoundingBoxDescent;

    // Measure text 1
    ctx.font = `20px Arial, sans-serif`;
    const textMetrics1 = ctx.measureText(textLine1);
    const textHeight1 =
      textMetrics1.actualBoundingBoxAscent +
      textMetrics1.actualBoundingBoxDescent;

    const yPosLine2 = canvas.height - textPaddingY;
    const yPosLine1 = canvas.height - textPaddingY - textHeight2 - 8;

    // Check background behind text area
    const textBlockHeight = textHeight1 + textHeight2 + 8;
    const isBrightAtBottom = isBrightBackground(
      ctx,
      textPaddingX,
      yPosLine1 - textHeight1,
      Math.max(textMetrics1.width, textMetrics2.width),
      textBlockHeight,
    );

    const textColor = isBrightAtBottom || isBrightText ? "#FFFFFF" : "#000000";
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.font = `20px Arial, sans-serif`;
    ctx.fillText(textLine1, textPaddingX, yPosLine1);

    ctx.font = `12px Arial, sans-serif`;
    ctx.fillText(textLine2, textPaddingX, yPosLine2);
  }

  const finalImage = canvas.toDataURL("image/png");

  const blob = await (await fetch(finalImage)).blob();
  const imageFile = new File([blob], fileName, { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
    try {
      await navigator.share({
        files: [imageFile],
        title: "AIA Vitality Wrapped",
        text: "Check out my summary with AIA Vitality!",
      });
      return; // Exit after successful share
    } catch (err) {
      // User likely cancelled the share, so we do nothing.
      console.log("Share was cancelled or failed", err);
      return;
    }
  }

  // Fallback for browsers that don't support Web Share API or if sharing fails
  const link = document.createElement("a");
  link.href = finalImage;

  // iOS Safari doesn't support the download attribute well for data URIs.
  // Opening in a new tab is a better experience.
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    link.target = "_blank";
  } else {
    link.download = fileName;
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function isBrightBackground(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  sampleWidth = 20,
  sampleHeight = 20,
) {
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;

  // Clamp coordinates and dimensions to be within the canvas bounds
  const sx = Math.max(0, x);
  const sy = Math.max(0, y);
  const sw = Math.min(sampleWidth, canvasWidth - sx);
  const sh = Math.min(sampleHeight, canvasHeight - sy);

  if (sw <= 0 || sh <= 0) {
    return false; // The sample area is outside the canvas
  }

  const imageData = ctx.getImageData(sx, sy, sw, sh).data;

  let totalBrightness = 0;
  let count = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const a = imageData[i + 3];

    // Only consider pixels that are mostly opaque
    if (a > 200) {
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      totalBrightness += brightness;
      count++;
    }
  }

  if (count === 0) return false; // Default to dark if no opaque pixels were sampled

  return totalBrightness / count > 180; // A threshold for what's considered "bright"
}
