export interface SidenavMenuItem {
  id: string;
  text: string;
  route: string;
  icon: string;
  isActive: boolean;
  subItems: SidenavMenuItem[];
}
