import { IBreadcrumbNode } from './IBreadcrumbNode';
import { createUUID } from '../utils/createUUID';

export class BreadcrumbNode implements IBreadcrumbNode {
  private nextNode: BreadcrumbNode | null = null;
  id: string;
  path: string;
  data?: unknown;
  title?: string;

  constructor(path: string, id?: string, data?: unknown, title?: string) {
    this.path = path;
    this.id = id ?? createUUID();
    this.data = data;
    this.title = title;
  }

  public getBreadcrumbNode = (): IBreadcrumbNode => {
    const result: IBreadcrumbNode = { path: this.path, id: this.id };
    if (this.data) {
      result.data = this.data;
    }
    if (this.title) {
      result.title = this.title;
    }
    return result;
  };

  public setNextNode = (nextNode: BreadcrumbNode | null): void => {
    this.nextNode = nextNode;
  };

  public getNextNode = () => this.nextNode;

  public hasNextNode = () => this.nextNode !== null;
}
