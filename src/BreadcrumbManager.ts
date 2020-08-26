import { BreadcrumbNode } from './models/breadcrumbNode/BreadcrumbNode';
import { ISimpleBreadcrumbNode } from './models/breadcrumbNode/IBreadcrumbNode';
import { isBreadcrumbNode } from './models/utils/breadcrumbManagerUtils';

type FindNodeCondition = (node: BreadcrumbNode | null) => boolean;

export class BreadcrumbManager {
  private rootNode: BreadcrumbNode | null = null;

  constructor(pathItems: string[]);
  constructor(nodes: ISimpleBreadcrumbNode[]);
  constructor(items: string[] | ISimpleBreadcrumbNode[]) {
    if (items.length === 0) {
      throw new Error('Cannot initialize breadcrumb with empty array');
    }
    if (isBreadcrumbNode(items)) {
      this.initWithBreadcrumbItems(items);
    } else {
      this.initWithPathItems(items);
    }
  }

  public addNode(newNode: BreadcrumbNode) {
    const lastNode = this.getLastNode();
    lastNode?.setNextNode(newNode);
  }

  public findNodeByPath = (pathItem: string) =>
    this.findNodeWithCondition((node) => node?.path === pathItem);

  public findNodeById = (id: string) =>
    this.findNodeWithCondition((node) => node?.id === id);

  public getLastNode = () =>
    this.findNodeWithCondition((node) => node?.hasNextNode() !== true);

  public setPath = (path: string[]) => {
    let previousNode = null;
    for (let i = 0; i < path.length; ++i) {
      if (previousNode === null) {
        if (this.rootNode?.path !== path[i]) {
          this.rootNode = new BreadcrumbNode(path[i]);
          previousNode = this.rootNode;
          continue;
        } else {
          previousNode = this.rootNode;
          continue;
        }
      }
      if (!previousNode?.hasNextNode()) {
        const node = new BreadcrumbNode(path[i]);
        previousNode!.setNextNode(node);
        previousNode = node;
      } else if (previousNode.getNextNode()!.path !== path[i]) {
        const node = new BreadcrumbNode(path[i]);
        previousNode.setNextNode(node);
        previousNode = node;
      } else {
        previousNode = previousNode.getNextNode();
      }
    }
  };

  public getAllNodes = () => {
    let currentNode = this.rootNode;
    const nodes = [{ ...this.rootNode!.getBreadcrumbNode(), index: 0 }];
    while (currentNode!.hasNextNode()) {
      const nextNode = currentNode!.getNextNode();
      nodes.push({ ...nextNode!.getBreadcrumbNode(), index: nodes.length });
      currentNode = nextNode!;
    }
    return nodes;
  };

  private initWithBreadcrumbItems = (items: ISimpleBreadcrumbNode[]) => {
    this.init(
      items
        .sort((a, b) => {
          if (a.index < b.index) {
            return -1;
          } else if (a.index > b.index) {
            return 1;
          } else {
            return 0;
          }
        })
        .map(
          (item) =>
            new BreadcrumbNode(item.path, item.id, item.data, item.title)
        )
    );
  };

  private initWithPathItems = (items: string[]) => {
    this.init(items.map((item) => new BreadcrumbNode(item)));
  };

  private init = (nodes: BreadcrumbNode[]) => {
    const [rootNode, ...restNodes] = nodes;
    this.rootNode = rootNode;
    let currentNode = this.rootNode;
    for (let i = 0; i < restNodes.length; ++i) {
      const node = restNodes[i];
      currentNode.setNextNode(node);
      currentNode = node;
    }
  };

  private findNodeWithCondition = (condition: FindNodeCondition) => {
    let currentNode = this.rootNode;
    while (!condition(currentNode)) {
      currentNode = currentNode?.getNextNode() || null;
    }
    return currentNode;
  };
}
