export interface Official {
    id: string;
    name: string;
    party?: string;
    current_role?: {
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
export interface ContactFormProps {
    official: Official;
    onClose: () => void;
}

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

