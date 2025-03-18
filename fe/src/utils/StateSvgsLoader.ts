// This imports every .svg in ../StateSVGs/ eagerly (i.e. at build time)
const modules = import.meta.glob<{ default: string }>("../assets/StateSVGs/*.svg", { eager: true });
const stateSvgMap: Record<string, string> = {};

for (const path in modules) {

    const fileName = path.split("/").pop()?.replace(".svg", "") || "";
    stateSvgMap[fileName] = (modules[path]).default; 
}
export default stateSvgMap;
