/* eslint-disable @typescript-eslint/no-explicit-any */
// This imports every .svg in ../StateSVGs/ eagerly (i.e. at build time)
const modules = import.meta.glob<string>("../StateSVGs/*.svg", { eager: true });
const stateSvgMap: Record<string, string> = {};

for (const path in modules) {

    const fileName = path.split("/").pop()?.replace(".svg", "") || "";
    stateSvgMap[fileName] = (modules[path] as any).default; 
}
export default stateSvgMap;
