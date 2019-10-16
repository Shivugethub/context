export interface ContextMenuItem {
  label?: string;
  icon?: string;
  routerLink?: any;
  command?: (event?:any) => void;
  items?: ContextMenuItem[] | ContextMenuItem[][];
}
