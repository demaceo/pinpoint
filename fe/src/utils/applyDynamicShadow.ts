/* eslint-disable @typescript-eslint/no-unused-vars */
// Function to convert RGB to RGBA
// export const rgbToRGBA = (rgb: string, alpha: number = 0.95): string => {
//   const match = rgb.match(/\d+/g);
//   if (!match) return `rgba(0, 0, 0, ${alpha})`; 

//   const [r, g, b] = match.map(Number);
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// Function to apply dynamic drop-shadow using background color
// const applyDynamicShadow = () => {
//   document.querySelectorAll("[class^='xstyles-']").forEach((el) => {
//     const element = el as HTMLElement;
//     const computedBgColor = window.getComputedStyle(element).backgroundColor;
//     console.log('computedBgColor of xstyles el', computedBgColor);
//     if (computedBgColor.startsWith("rgb")) {
//       const rgbaColor = rgbToRGBA(computedBgColor);
//       console.log('converted xstyles bckground rgba', rgbaColor);
//       document.querySelectorAll("[class^='state-pic']").forEach((el) => {
//         const stateSvg = el as HTMLElement;
//         console.log('stateSvg', stateSvg);
//         stateSvg.style.filter = `drop-shadow(2px 4px 6px ${rgbaColor})`;
//         stateSvg.style.backgroundColor = "rgba(255, 255, 255, 0);"
//         console.log('state svg', stateSvg.style.backgroundColor)
//       })
//       element.style.backgroundColor = "rgba(255, 255, 255, 0);"

//       console.log('filter', element.style.filter)
//     }
//   });
// };
