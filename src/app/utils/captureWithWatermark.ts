// src/utils/captureWithWatermark.ts
import { toPng } from "html-to-image";
import { htmlToImageUsingSatori } from "./generateImageWithSatori";

type CaptureOptions = {
  element: HTMLElement;
  fileName?: string;
  disableWatermark?: boolean;
  disableWatermarkLogo?: boolean;
  isBrightText?: boolean;
  pageName?: string;
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

    // === LOGO ===
    const baseSize = Math.min(canvas.width, canvas.height) * 0.22;
    const watermarkWidth = Math.max(110, Math.min(baseSize, 240));

    const watermark = new Image();
    watermark.src = "/aia-new-white.svg";
    await new Promise((res) => (watermark.onload = res));

    let ratio = watermark.width / watermark.height;
    if (!ratio || !isFinite(ratio)) ratio = 4;

    const watermarkHeight = watermarkWidth / ratio;

    // 👉 offset supaya tidak terlalu pojok
    const offsetX = 16;
    const offsetY = 12;

    ctx.globalAlpha = 0.9;
    ctx.drawImage(
      watermark,
      padding + offsetX,
      padding + offsetY,
      watermarkWidth,
      watermarkHeight,
    );
    ctx.globalAlpha = 1;

    // === TEXT ===
    const textLine1 = "aia.id/aiavitality";
    const textLine2 =
      "PT AIA Financial berizin dan diawasi oleh Otoritas Jasa Keuangan";

    const textPaddingX = padding;
    const textPaddingY = padding;

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = isBrightText ? "#FFFFFF" : "#000000";

    ctx.font = "20px Arial, sans-serif";
    const metrics2 = (() => {
      ctx.font = "12px Arial, sans-serif";
      return ctx.measureText(textLine2);
    })();

    const textHeight2 =
      metrics2.actualBoundingBoxAscent + metrics2.actualBoundingBoxDescent;

    const yPosLine2 = canvas.height - textPaddingY;
    const yPosLine1 = yPosLine2 - textHeight2 - 8;

    ctx.font = "20px Arial, sans-serif";
    ctx.fillText(textLine1, textPaddingX, yPosLine1);

    ctx.font = "12px Arial, sans-serif";
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
      return;
    } catch {
      return;
    }
  }

  const link = document.createElement("a");
  link.href = finalImage;

  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    link.target = "_blank";
  } else {
    link.download = fileName;
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ========================================================= */

export async function captureWithWatermarkV2({
  element,
  fileName = "shared-image.png",
  disableWatermark = false,
  disableWatermarkLogo = false,
  isBrightText = false,
  pageName,
}: CaptureOptions) {
  const imageDataUrl = await htmlToImageUsingSatori(element);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.src = imageDataUrl;
  await new Promise((res) => (img.onload = res));

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  if (!disableWatermark) {
    const padding = 24;

    // === LOGO ===
    if (!disableWatermarkLogo) {
      const baseSize = Math.min(canvas.width, canvas.height) * 0.3;
      const watermarkWidth = Math.max(140, Math.min(baseSize, 320));

      const watermark = new Image();
      watermark.src = "/aia-new-white.svg";
      await new Promise((res) => (watermark.onload = res));

      let ratio = watermark.width / watermark.height;
      if (!ratio || !isFinite(ratio)) ratio = 4;

      const watermarkHeight = watermarkWidth / ratio;

      const offsetX = 40;
      // Kondisi offsetY: 16 untuk Weekly Challenge & Heart Rate, 76 untuk yang lain
      const offsetY =
        pageName === "Weekly Challenge" || pageName === "Heart Rate" ? 16 : 76;

      ctx.globalAlpha = 0.9;
      ctx.drawImage(
        watermark,
        padding + offsetX,
        padding + offsetY,
        watermarkWidth,
        watermarkHeight,
      );
      ctx.globalAlpha = 1;
    }

    // === TEXT OJK Statement ===
    const textLine1 = "aia.id/aiavitality";
    const textLine2 =
      "PT AIA Financial berizin dan diawasi oleh Otoritas Jasa Keuangan";

    const textOffsetX = 40;
    const textOffsetY = 20;  // 

    const textPaddingX = canvas.width - padding - textOffsetX;
    const textPaddingY = padding + textOffsetY;

    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = isBrightText ? "#FFFFFF" : "#000000";

    ctx.font = "7px Arial, sans-serif";
    const metrics2 = ctx.measureText(textLine2);
    const textHeight2 =
      metrics2.actualBoundingBoxAscent + metrics2.actualBoundingBoxDescent;

    const yPosLine2 = canvas.height - textPaddingY;
    const yPosLine1 = yPosLine2 - textHeight2 - 16;

    ctx.font = "12px Arial, sans-serif";
    ctx.fillText(textLine1, textPaddingX, yPosLine1);

    ctx.font = "7px Arial, sans-serif";
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
      return;
    } catch {}
  }

  const link = document.createElement("a");
  link.href = finalImage;

  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    link.target = "_blank";
  } else {
    link.download = fileName;
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
