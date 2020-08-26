import { BreadcrumbManager } from './BreadcrumbManager';
import { BreadcrumbNode } from './models/breadcrumbNode/BreadcrumbNode';

describe('Breadcrumb manager initialisation', () => {
  test('Breadcrumb manager initialisation with path', () => {
    const breadcrumbManager = new BreadcrumbManager([
      'path1',
      'path2',
      'path3',
    ]);
    expect(
      breadcrumbManager
        .getAllNodes()
        .map((node) => ({ index: node.index, path: node.path }))
    ).toEqual([
      { index: 0, path: 'path1' },
      { index: 1, path: 'path2' },
      { index: 2, path: 'path3' },
    ]);
  });

  test('Breadcrumb manager initialisation with nodes', () => {
    const breadcrumbManager = new BreadcrumbManager([
      { index: 0, path: 'path1', data: { test: 'test' }, id: 'id1' },
      { index: 2, path: 'path3', id: 'id3' },
      { index: 1, path: 'path2', title: 'path 2 title', id: 'id2' },
    ]);
    expect(breadcrumbManager.getAllNodes()).toEqual([
      { index: 0, path: 'path1', data: { test: 'test' }, id: 'id1' },
      { index: 1, path: 'path2', title: 'path 2 title', id: 'id2' },
      { index: 2, path: 'path3', id: 'id3' },
    ]);
  });

  test('Breadcrumb manager initialisation with an empty array', () => {
    try {
      new BreadcrumbManager([]);
    } catch (err) {
      expect(err).toEqual(
        new Error('Cannot initialize breadcrumb with empty array')
      );
    }
  });
});

describe('Managing nodes', () => {
  let breadcrumbManager: BreadcrumbManager;

  beforeEach(() => {
    breadcrumbManager = new BreadcrumbManager([
      'path1',
      'path2',
      'path3',
      'path4',
    ]);
  });

  test('Adding new node', () => {
    breadcrumbManager.addNode(new BreadcrumbNode('path5'));
    expect(
      breadcrumbManager
        .getAllNodes()
        .map((node) => ({ index: node.index, path: node.path }))
    ).toEqual([
      { index: 0, path: 'path1' },
      { index: 1, path: 'path2' },
      { index: 2, path: 'path3' },
      { index: 3, path: 'path4' },
      { index: 4, path: 'path5' },
    ]);
  });

  test('Finding node by path', () => {
    const node = breadcrumbManager.findNodeByPath('path3');
    expect(node?.path).toEqual('path3');
    expect(node?.hasNextNode()).not.toBeUndefined();
  });

  test('Finding node by id', () => {
    const nodes = breadcrumbManager.getAllNodes();
    const node = breadcrumbManager.findNodeById(nodes[2].id);
    expect(node?.path).toEqual('path3');
    expect(node?.hasNextNode()).not.toBeUndefined();
  });

  test('Get last node', () => {
    const lastNode = breadcrumbManager.getLastNode();
    expect(lastNode?.path).toEqual('path4');
  });

  test('Set path', () => {
    breadcrumbManager.setPath(['path1', 'path2', 'path6']);
    expect(
      breadcrumbManager
        .getAllNodes()
        .map((node) => ({ index: node.index, path: node.path }))
    ).toEqual([
      { index: 0, path: 'path1' },
      { index: 1, path: 'path2' },
      { index: 2, path: 'path6' },
    ]);
  });

  test('Set path with more items', () => {
    breadcrumbManager.setPath(['path1', 'path2', 'path3', 'path4', 'path5']);
    expect(
      breadcrumbManager
        .getAllNodes()
        .map((node) => ({ index: node.index, path: node.path }))
    ).toEqual([
      { index: 0, path: 'path1' },
      { index: 1, path: 'path2' },
      { index: 2, path: 'path3' },
      { index: 3, path: 'path4' },
      { index: 4, path: 'path5' },
    ]);
  });

  test('Set new path', () => {
    breadcrumbManager.setPath([
      'path11',
      'path12',
      'path13',
      'path14',
      'path15',
    ]);
    expect(
      breadcrumbManager
        .getAllNodes()
        .map((node) => ({ index: node.index, path: node.path }))
    ).toEqual([
      { index: 0, path: 'path11' },
      { index: 1, path: 'path12' },
      { index: 2, path: 'path13' },
      { index: 3, path: 'path14' },
      { index: 4, path: 'path15' },
    ]);
  });
});
