/**
 * This utility simulates Satori-style image generation by capturing the DOM element
 * and applying transformations similar to what Satori would do.
 */

import { toPng, toJpeg } from "html-to-image";
import type { Options } from "html-to-image/lib/types";

// Enhanced options for better image quality and layout
const ENHANCED_OPTIONS: Options = {
  cacheBust: true,
  pixelRatio: 2, // Higher resolution for crisp images
  backgroundColor: "#ffffff", // Ensure consistent background
  style: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  filter: (node: Node) => {
    // Exclude certain elements that shouldn't appear in the image
    if (node instanceof HTMLElement) {
      // Don't include hidden elements or share buttons in the capture
      return (
        !node.classList.contains("share-btn") &&
        !node.classList.contains("hide-share") &&
        node.style.display !== "none" &&
        node.style.visibility !== "hidden"
      );
    }
    return true;
  },
};

// Helper function to convert HTML element to high-quality image
export async function htmlToImageUsingSatori(
  element: HTMLElement,
): Promise<string> {
  // Calculate the actual content dimensions to avoid whitespace
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);

  // Adjust options to match the actual content size
  const adjustedOptions: Options = {
    ...ENHANCED_OPTIONS,
    width: rect.width,
    height: rect.height,
    style: {
      ...ENHANCED_OPTIONS.style,
      margin: "0",
      padding: computedStyle.padding,
      border: computedStyle.border,
      maxWidth: "unset",
      maxHeight: "unset",
      overflow: "visible",
    },
  };

  // Use html-to-image to capture the element as PNG with adjusted options
  const dataUrl = await toPng(element, adjustedOptions);

  return dataUrl;
}

// Alternative function to generate JPEG (smaller file size)
export async function htmlToJpegUsingSatori(
  element: HTMLElement,
): Promise<string> {
  // Use html-to-image to capture the element as JPEG with enhanced options
  const dataUrl = await toJpeg(element, {
    ...ENHANCED_OPTIONS,
    quality: 0.95, // High quality JPEG
  });

  return dataUrl;
}

// Helper function to convert data URL to Blob
export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const response = await fetch(dataUrl);
  return await response.blob();
}
