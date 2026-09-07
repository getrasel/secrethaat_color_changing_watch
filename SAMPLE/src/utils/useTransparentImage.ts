import { useState, useEffect } from 'react';

/**
 * Custom hook to dynamically remove white/light studio background from an image
 * and return a pure transparent PNG data URL.
 */
export function useTransparentImage(imageSrc: string, threshold = 220): string {
  const [transparentSrc, setTransparentSrc] = useState<string>(imageSrc);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        // BFS flood fill from 4 corners to remove only the outer white background
        // and keep inner white clock face parts intact
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        // Push border pixels
        for (let x = 0; x < width; x++) {
          queue.push(x, 0);
          queue.push(x, height - 1);
        }
        for (let y = 0; y < height; y++) {
          queue.push(0, y);
          queue.push(width - 1, y);
        }

        while (queue.length > 0) {
          const y = queue.pop()!;
          const x = queue.pop()!;
          const idx = y * width + x;

          if (visited[idx]) continue;
          visited[idx] = 1;

          const pIdx = idx * 4;
          const r = data[pIdx];
          const g = data[pIdx + 1];
          const b = data[pIdx + 2];

          // Check if pixel is white / light neutral background
          const brightness = (r + g + b) / 3;
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

          if (brightness > threshold && maxDiff < 20) {
            // Make transparent with smooth edge antialiasing
            if (brightness > 245) {
              data[pIdx + 3] = 0;
            } else {
              // Feathered edge
              const alpha = Math.max(0, Math.min(255, ((245 - brightness) / 25) * 255));
              data[pIdx + 3] = Math.round(alpha);
            }

            // Expand to neighbors
            if (x > 0 && !visited[idx - 1]) queue.push(x - 1, y);
            if (x < width - 1 && !visited[idx + 1]) queue.push(x + 1, y);
            if (y > 0 && !visited[idx - width]) queue.push(x, y - 1);
            if (y < height - 1 && !visited[idx + width]) queue.push(x, y + 1);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setTransparentSrc(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Error processing transparent image:', err);
      }
    };
  }, [imageSrc, threshold]);

  return transparentSrc;
}
