import { Bill, BillDetails } from "../assets/types";

const getRandomDate = (): string => {
    const year = Math.floor(Math.random() * (2024 - 2000 + 1)) + 2000; // Random year between 2000 and 2024
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const generateMockBill = (): Bill => {
    const billId = `B${Math.floor(Math.random() * 100000)}`;
    return {
        id: billId,
        latest_action_date: getRandomDate(),
        identifier: billId,
        title: `Mock Bill Title ${billId}`,
        legislative_session: { identifier: billId },
        classification: ["constitutional", "law"],
    };
};

const generateMockBillDetails = (bill: Bill): BillDetails => {
    return {
        ...bill,
        latest_action_description: "Mock action taken on the bill.",
        latest_action_date: getRandomDate(),
        abstracts: [{ abstract: "This is a mock summary of the bill." }],
        sponsorships: [
            { id: "S123", entity_type: "person", name: "John Doe", party: "Independent", current_role: { title: "Senator" } },
        ],
        related_bills: [{ identifier: "B12345", relation_type: "companion", legislative_session: "2023-2024" }],
        documents: [
            { id: "D123", note: "Mock Document", links: [{ url: "https://example.com/mock-document.pdf" }] },
        ],
        versions: [
            { id: "V123", note: "Mock Version", links: [{ url: "https://example.com/mock-version.pdf" }] },
        ],
    };
};

export const mockBills: Bill[] = Array.from({ length: 5 }, generateMockBill);
export const mockBillDetails: BillDetails[] = mockBills.map(generateMockBillDetails);
