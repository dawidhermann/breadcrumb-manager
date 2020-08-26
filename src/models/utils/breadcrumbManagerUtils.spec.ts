import { isBreadcrumbNode } from './breadcrumbManagerUtils';
import { createUUID } from './createUUID';

test('Test isBreadcrumbNode function negative case', () => {
  expect(isBreadcrumbNode(['path1', 'path2', 'path3'])).toBe(false);
});

test('Test isBreadcrumbNode function positive case', () => {
  expect(
    isBreadcrumbNode([
      { index: 0, path: 'path1', id: createUUID() },
      { index: 1, path: 'path2', id: createUUID() },
    ])
  ).toBe(true);
});
