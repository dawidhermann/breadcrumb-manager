import { ISimpleBreadcrumbNode } from '../breadcrumbNode/IBreadcrumbNode';

export function isBreadcrumbNode(
  items: string[] | ISimpleBreadcrumbNode[]
): items is ISimpleBreadcrumbNode[] {
  return (items[0] as ISimpleBreadcrumbNode).path !== undefined;
}
