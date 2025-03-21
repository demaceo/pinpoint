// // utils/cache.ts

// import { Bill } from "../assets/types";

// const CACHE_PREFIX = "billsCache";
// const CACHE_TTL_MS = 1000 * 60 * 15; // ⏱ 15 minutes

// export const getCachedBills = (jurisdiction: string): Bill[] | null => {
//     const cacheKey = `${CACHE_PREFIX}_${jurisdiction}`;
//     const raw = localStorage.getItem(cacheKey);
//     if (!raw) return null;

//     try {
//         const { data, timestamp } = JSON.parse(raw);
//         const now = Date.now();

//         if (now - timestamp < CACHE_TTL_MS) {
//             return data;
//         } else {
//             localStorage.removeItem(cacheKey);
//             return null;
//         }
//     } catch (err) {
//         console.error("Failed to parse cached bills:", err);
//         return null;
//     }
// };

// export const cacheBills = (jurisdiction: string, bills: Bill[]) => {
//     const cacheKey = `${CACHE_PREFIX}_${jurisdiction}`;
//     const payload = {
//         data: bills,
//         timestamp: Date.now(),
//     };
//     localStorage.setItem(cacheKey, JSON.stringify(payload));
// };
