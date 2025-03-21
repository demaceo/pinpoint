import { v4 as uuidv4 } from "uuid";
import { Official, Jurisdiction } from "../assets/types";

const firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah", "David", "Laura"];
const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Harris", "Martin", "Lee", "Walker"];
const titles = ["Governor", "Senator", "Mayor", "Representative", "Attorney General", "Council Member", "Secretary of State"];
const parties = ["Democratic", "Republican", "Independent", "Libertarian", "Green"];
const states = [
    { abbr: "AL", state: "Alabama" }, { abbr: "AK", state: "Alaska" }, { abbr: "AZ", state: "Arizona" },
    { abbr: "AR", state: "Arkansas" }, { abbr: "CA", state: "California" }, { abbr: "CO", state: "Colorado" },
    { abbr: "CT", state: "Connecticut" }, { abbr: "DE", state: "Delaware" }, { abbr: "FL", state: "Florida" },
    { abbr: "GA", state: "Georgia" }, { abbr: "HI", state: "Hawaii" }, { abbr: "ID", state: "Idaho" },
    { abbr: "IL", state: "Illinois" }, { abbr: "IN", state: "Indiana" }, { abbr: "IA", state: "Iowa" },
    { abbr: "KS", state: "Kansas" }, { abbr: "KY", state: "Kentucky" }, { abbr: "LA", state: "Louisiana" },
    { abbr: "ME", state: "Maine" }, { abbr: "MD", state: "Maryland" }, { abbr: "MA", state: "Massachusetts" },
    { abbr: "MI", state: "Michigan" }, { abbr: "MN", state: "Minnesota" }, { abbr: "MS", state: "Mississippi" },
    { abbr: "MO", state: "Missouri" }, { abbr: "MT", state: "Montana" }, { abbr: "NE", state: "Nebraska" },
    { abbr: "NV", state: "Nevada" }, { abbr: "NH", state: "New Hampshire" }, { abbr: "NJ", state: "New Jersey" },
    { abbr: "NM", state: "New Mexico" }, { abbr: "NY", state: "New York" }, { abbr: "NC", state: "North Carolina" },
    { abbr: "ND", state: "North Dakota" }, { abbr: "OH", state: "Ohio" }, { abbr: "OK", state: "Oklahoma" },
    { abbr: "OR", state: "Oregon" }, { abbr: "PA", state: "Pennsylvania" }, { abbr: "RI", state: "Rhode Island" },
    { abbr: "SC", state: "South Carolina" }, { abbr: "SD", state: "South Dakota" }, { abbr: "TN", state: "Tennessee" },
    { abbr: "TX", state: "Texas" }, { abbr: "UT", state: "Utah" }, { abbr: "VT", state: "Vermont" },
    { abbr: "VA", state: "Virginia" }, { abbr: "WA", state: "Washington" }, { abbr: "WV", state: "West Virginia" },
    { abbr: "WI", state: "Wisconsin" }, { abbr: "WY", state: "Wyoming" }
];

/**
 * Generates a large dataset of mock government officials
 * @param count Number of officials to generate
 * @returns An array of mock officials
 */
export function generateMockOfficials(count: number = 120): Official[] {
    const officials: Official[] = [];

    const getRandomBirthDate = (): string => {
        const year = Math.floor(Math.random() * (1994 - 1945 + 1)) + 1945; // Random year between 1945 and 1994
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0"); // Random month 01-12
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0"); // Random day 01-28 (to avoid invalid dates)
        return `${year}-${month}-${day}`;
    };

    for (let i = 0; i < count; i++) {
        const state = states[Math.floor(Math.random() * states.length)];
        const official: Official = {
            id: uuidv4(),
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} x ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            party: parties[Math.floor(Math.random() * parties.length)],
            email: `contact${Math.floor(Math.random() * 1000)}@gov.${state.abbr.toLowerCase()}`,
            birth_date: getRandomBirthDate(),
            image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${Math.floor(Math.random() * 99)}.jpg`,
            current_role: {
                title: titles[Math.floor(Math.random() * titles.length)],
                org_classification: Math.random() > 0.5 ? "upper" : "lower",
                district: Math.floor(Math.random() * 50) + 1,
                division_id: ""
            },
            jurisdiction: state.state as unknown as Jurisdiction,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        officials.push(official);
    }

    return officials;
}
export const mockOfficials = generateMockOfficials();
