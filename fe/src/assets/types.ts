export interface Official {
    id: string;
    name: string;
    party?: string;
    current_role: {
        title: string;
        org_classification?: string;
        district: string | number;
        division_id?: string;
    };
    jurisdiction?: {
        id: string;
        name: string;
        classification: string;
    };
    given_name?: string;
    family_name?: string;
    image?: string;
    email?: string;
    gender?: string;
    birth_date?: string;
    death_date?: string;
    extras?: Record<string, unknown>;
    created_at?: string;
    updated_at?: string;
    openstates_url?: string;
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
// export interface ContactFormProps {
//     official: Official;
//     onClose: () => void;
// }

export interface FiltersProps {
    selectedParty: string;
    selectedRole: string;
    searchQuery: string;
    onFilterChange: (filterType: string, value: string) => void;
    onSearchChange: (query: string) => void;
    onSelectAll: (isChecked: boolean) => void;
    onContactClick: () => void;
    onChatClick: () => void;
    hasSelectedOfficials: boolean;
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

// export interface BillDetails {
//     identifier: string;
//     title: string;
//     session?: string;
//     jurisdiction?: { name: string };
//     latest_action_description?: string;
//     latest_action_date?: string;
//     abstracts?: { abstract: string }[];
//     sponsorships?: { name: string; party?: string; current_role?: { title: string } }[];
//     related_bills?: { identifier: string; legislative_session: string; relation_type: string }[];
//     documents?: { note: string; links: { url: string }[] }[];
//     versions?: { note: string; links: { url: string }[] }[];
// }

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
