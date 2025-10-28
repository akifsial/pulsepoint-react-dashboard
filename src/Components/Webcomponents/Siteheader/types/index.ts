export interface DropdownOption {
    id: string;
    linkName: string;
    path: string;
  }
  
  export interface SiteHeaderLinksProps {
    id: string;
    linkName: string;
    path: string;
    hasDropdown?: boolean;
    dropdownOptions?: DropdownOption[];
  }
  