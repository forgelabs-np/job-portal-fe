export interface AuthorityEntry {
  authority: string;
}

export interface CurrentUser {
  id: number;
  email: string;
  password?: string;
  fullName: string;
  emailVerified: boolean;
  authorities: AuthorityEntry[];
  roles: string[];
  enabled: boolean;
  active: boolean;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  profileComplete: boolean;
  profileApprovalStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  profileRejectionReason: string | null;
  agencyProfile: any | null;
  adminProfile: any | null;
  candidateProfile: any | null;
  documents: any[] | null;
}
