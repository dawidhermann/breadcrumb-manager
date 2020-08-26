export interface IBreadcrumbNode {
  id: string;
  path: string;
  data?: unknown;
  title?: string;
}

export interface ISimpleBreadcrumbNode extends IBreadcrumbNode {
  index: number;
}
