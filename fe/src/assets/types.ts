export interface OpenStatesResponse {
    results: Official[];
    pagination: Pagination;
}

export interface Official {
    socials?: Record<string, string>;
    id: string; // Unique OpenStates ID
    name: string; // Full name
    given_name?: string; // First name
    family_name?: string; // Last name
    party: string; // Party affiliation
    image?: string; // Profile picture URL
    email?: string; // Contact email
    gender?: string; // Gender
    birth_date?: string; // Date of birth (ISO format YYYY-MM-DD)
    death_date?: string; // Date of death (if applicable)
    extras?: {
        profession?: string; // Profession
    };
    current_role: Role;
    jurisdiction: Jurisdiction;
    created_at: string; // Timestamp when record was created
    updated_at: string; // Timestamp when record was updated
    openstates_url?: string; // OpenStates profile URL
    other_identifiers?: Identifier[]; // Alternative IDs
    other_names?: OtherName[]; // Nicknames or alternate names
    links?: Link[]; // Links to official pages
    sources?: Source[]; // Source data links
    offices?: Office[]; // Office details (address, phone, fax)
}

export interface Role {
    title: string; // Job title (Senator, Representative, etc.)
    org_classification: "upper" | "lower"; // Chamber classification
    district: number | string; // District number or identifier
    division_id: string; // Open Civic Data division ID
}

export interface Jurisdiction {
    id: string; // Unique jurisdiction ID
    name: string; // Jurisdiction name (e.g., "North Carolina")
    classification: "state" | "city" | "county"; // Jurisdiction type
}

export interface Identifier {
    identifier: string;
    scheme: string;
}

export interface OtherName {
    name: string;
    note?: string; // Reason for alternate name (e.g., nickname)
}

export interface Link {
    url: string;
    note?: string; // Description of the link (e.g., "homepage")
}

export interface Source {
    url: string;
    note?: string; // Description of the data source
}

export interface Office {
    name: string; // Office name
    fax?: string; // Fax number
    voice?: string; // Phone number
    address?: string; // Office address
    classification: "capitol" | "district" | "other"; // Office type
}

export interface Pagination {
    per_page: number;
    page: number;
    max_page: number;
    total_items: number;
}
export interface Term {
    start_date: string; // Start date of the term (ISO format YYYY-MM-DD)
    end_date?: string; // End date (optional, for current term)
    office: string; // Name of the office held
    party?: string; // Party affiliation during the term
    state: string; // State associated with the term
}
export interface OfficialLinkProps {
    official: Official;
    index: number;
    onSelect: () => void;
    isChecked?: boolean;
}

export interface OfficialCardProps {
    official: Official;
    isJoker?: boolean;
    onClose: () => void;
}

export interface UsStateEntry {
    abbr: string;
    state: string;
    xstyles: string;
}


export interface Location {
    lat: number;
    lng: number;
}

export interface FiltersProps {
    selectedParty: string;
    selectedRole: string;
    selectedAgeRange: [number, number]; // ✅ Age range as a tuple [minAge, maxAge]
    searchQuery: string;
    onFilterChange: (filterType: string, value: string) => void;
    onSearchChange: (value: string) => void;
    onSelectAll: (isChecked: boolean) => void;
    onContactClick: () => void;
    onChatClick: () => void;
    hasSelectedOfficials: boolean;
    onAgeRangeChange: (ageRange: [number, number]) => void; // ✅ Function to update age range
}

export interface ButtonProps {
    label: string;
    className?: string;
    disabled?: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}


export interface ContactFormProps {
    selectedEmails: string[];
    selectedOfficials: Official[];
    onClose: () => void;
    onRemoveEmail: (email: string) => void;
}

export interface FetchBillsParams {
    jurisdiction: string;
    session?: string;
    chamber?: string;
    identifiers?: string[];
    classification?: string;
    sponsor?: string;
    sort?: string;
    page?: number;
    perPage?: number;
}

export interface Bill {
    id: string;
    latest_action_date: string;
    identifier: string;
    title: string;
    legislative_session: { identifier: string };
    classification: string[];
}

export interface BillTickerProps {
    jurisdiction: string;
}

export interface BillDetails {
    id: string;
    identifier: string;
    title: string;
    session?: string;
    jurisdiction?: {
        id: string;
        name: string;
        classification: string;
    };
    from_organization?: {
        id: string;
        name: string;
        classification: string;
    };
    classification?: string[];
    subject?: string[];
    latest_action_date?: string;
    latest_action_description?: string;
    latest_passage_date?: string;
    first_action_date?: string;
    abstracts?: { abstract: string; note?: string }[];
    sponsorships?: {
        current_role?: { title: string };
        party: string;
        id: string;
        name: string;
        entity_type: string;
        organization?: { id: string; name: string; classification: string };
        person?: {
            id: string;
            name: string;
            party?: string;
            current_role?: {
                title: string;
                org_classification: string;
                district?: string;
                division_id?: string;
            };
        };
        primary?: boolean;
        classification?: string;
    }[];
    related_bills?: {
        identifier: string;
        legislative_session: string;
        relation_type: string;
    }[];
    actions?: {
        id: string;
        description: string;
        date: string;
        classification?: string[];
    }[];
    documents?: {
        id: string;
        note: string;
        date?: string;
        links: { url: string; media_type?: string }[];
    }[];
    versions?: {
        id: string;
        note: string;
        date?: string;
        links: { url: string; media_type?: string }[];
    }[];
    votes?: {
        id: string;
        motion_text: string;
        motion_classification?: string[];
        start_date: string;
        result: string;
        identifier: string;
        organization?: { id: string; name: string; classification: string };
        votes?: {
            id: string;
            option: string;
            voter_name: string;
            voter?: {
                id: string;
                name: string;
                party?: string;
                current_role?: {
                    title: string;
                    org_classification: string;
                    district?: string;
                    division_id?: string;
                };
            };
        }[];
        counts?: {
            option: string;
            value: number;
        }[];
        sources?: { url: string; note?: string }[];
    }[];
    sources?: {
        url: string;
        note?: string;
    }[];
}
