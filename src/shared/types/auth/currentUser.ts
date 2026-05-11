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
}
