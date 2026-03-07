import fs from 'fs';
import path from 'path';
import { createIg, isIgnored } from './isIgnored';
import type { Slugs } from './parsePagesDir';
import { parseQueryFromTS } from './parseQueryFromTS';
import { replaceWithUnderscore } from './replaceWithUnderscore';

const PAGE_FILE_NAMES = ['page.tsx', 'page.jsx', 'page.js'];
export const createMethods = (
  indent: string,
  importName: string | undefined,
  slugs: Slugs,
  pathname: string,
) =>
  `${indent}  $url: (url${importName?.startsWith('Query') ? '' : '?'}: { ${
    importName ? `query${importName.startsWith('Optional') ? '?' : ''}: ${importName}, ` : ''
  }hash?: string }) => ({ pathname: '${pathname}' as const${
    slugs.length
      ? `, query: { ${slugs.join(', ')}${
          importName ? `, ...url${importName.startsWith('Query') ? '' : '?'}.query` : ''
        } }`
      : importName
        ? `, query: url${importName.startsWith('Query') ? '' : '?'}.query`
        : ''
  }, hash: url${importName?.startsWith('Query') ? '' : '?'}.hash, path: \`${pathname
    .replace(/\[\[?\.\.\.(.*?)\]\]?/g, `\${$1?.join('/')}`)
    .replace(/\[(.*?)\]/g, `\${$1}`)}\${buildSuffix(url)}\` })`;

class OutputObject {
  /**
   * This key is like [slug], not _slug
   */
  private objectKey: string;
  private parentObject: OutputObject | undefined;
  private importName: string | undefined;
  private hasPage: boolean = false;
  readonly children: OutputObject[] = [];

  get slug(): string | null {
    if (!(this.objectKey.startsWith('[') && this.objectKey.endsWith(']'))) return null;
    const slug = this.objectKey.replace(/[.[\]]/g, '');
    if (slug === undefined || slug === '') {
      return null;
    }
    return slug;
  }

  /** Slugs of this object and all its parents */
  get slugs(): string[] {
    const parentSlugs = this.parentObject?.slugs ?? [];
    if (this.slug === null) return parentSlugs;
    return [...parentSlugs, this.slug];
  }

  private setImportNameIfUndefined(importName: string | undefined) {
    if (this.importName === undefined) {
      this.importName = importName;
    }
  }

  private setHasPage() {
    this.hasPage = true;
  }

  constructor(args: { objectKey: string; parentObject: OutputObject | undefined }) {
    this.objectKey = args.objectKey;
    this.parentObject = args.parentObject;
  }

  private createOrGetExistChildObject(
    args: Omit<ConstructorParameters<typeof OutputObject>[0], 'parentObject'>,
  ): OutputObject {
    const childObject = this.children.find((child) => child.objectKey === args.objectKey);
    if (childObject !== undefined) {
      return childObject;
    } else {
      const newChildObject = new OutputObject({ ...args, parentObject: this });
      this.children.push(newChildObject);
      return newChildObject;
    }
  }

  get ParentObjects(): OutputObject[] {
    if (this.parentObject === undefined) return [];
    return [...this.parentObject.ParentObjects, this.parentObject];
  }

  get isRoot(): boolean {
    return this.parentObject === undefined;
  }

  get objectPath(): string {
    return OutputObject.objectPath(
      [
        ...this.ParentObjects.filter((parent) => !parent.isRoot).map((parent) => parent.objectKey),
        this.objectKey,
      ].join('/'),
    );
  }

  static objectPath(path: string) {
    return OutputObject.ignoreRouteGroupPath(path);
  }

  static ignoreRouteGroupPath(path: string) {
    return path
      .split('/')
      .filter((path) => !(path.startsWith('(') && path.endsWith(')')))
      .join('/');
  }

  static ignoreParallelRoutePath(path: string) {
    return path
      .split('/')
      .filter((path) => !path.startsWith('@'))
      .join('/');
  }

  static url(path: string) {
    return OutputObject.ignoreRouteGroupPath(OutputObject.ignoreParallelRoutePath(path));
  }

  get url(): string {
    return OutputObject.url(this.objectPath);
  }

  registerPage(args: { directoryRelativePath: string; importName: string | undefined }) {
    const splitTargetFileObjectPath = OutputObject.objectPath(args.directoryRelativePath)
      .split('/')
      .filter((path) => path !== '');
    const splitThisObjectPath = this.objectPath.split('/').filter((path) => path !== '');

    const nextObjectKey = splitTargetFileObjectPath.find((path, index) => {
      return splitThisObjectPath[index] !== path;
    });

    if (nextObjectKey === undefined) {
      this.setHasPage();
      this.setImportNameIfUndefined(args.importName);
      return;
    }

    const nextObject = this.createOrGetExistChildObject({ objectKey: nextObjectKey });
    nextObject.registerPage(args);
  }

  toText(): string {
    const indent = '  '.repeat(this.ParentObjects.length);
    const isRoot = this.ParentObjects.length === 0;
    const thisLevelTextBody = this.hasPage
      ? createMethods(indent, this.importName, this.slugs, `${this.isRoot ? '' : '/'}${this.url}`)
      : null;

    const childrenTexts = this.children
      .sort()
      .map((child) => child.toText())
      .filter((text) => text !== '');

    const childrenTextWithThisLevelText = [...childrenTexts, thisLevelTextBody].filter(
      (text) => text !== null,
    );

    const bodyText = childrenTextWithThisLevelText.join(',\n');
    const isNullable = this.objectKey.startsWith('[[');
    const objectKey =
      this.slug === null ? `'${replaceWithUnderscore(this.objectKey)}'` : `_${this.slug}`;

    return `${indent}${isRoot ? '' : `${objectKey}:`} ${this.slug === null ? `{\n${bodyText}\n${indent}}` : `(${this.slug}${isNullable ? '?' : ''}: ${/\[\./.test(this.objectKey) ? 'string[]' : 'string | number'}) => ({\n${bodyText}\n${indent}})`}`;
  }
}

export const parseAppDir = (
  input: string,
  output: string,
  ignorePath: string | undefined,
): { imports: string[]; text: string } => {
  const ig = createIg(ignorePath);
  const imports: string[] = [];
  const getImportName = (file: string) => {
    const result = parseQueryFromTS(output, file);

    if (result) {
      imports.push(result.importString);
      return result.importName;
    }
  };

  // init root directory object
  const outputObject = new OutputObject({
    objectKey: '/',
    parentObject: undefined,
  });

  const scanDirectoryRecursively = (targetDirectoryPath: string) => {
    if (!fs.statSync(targetDirectoryPath).isDirectory()) {
      throw new Error(`${targetDirectoryPath} is not a directory`);
    }

    const filteredThisDirectoryItems = fs.readdirSync(targetDirectoryPath).filter((item) => {
      return !isIgnored(ig, ignorePath, targetDirectoryPath, item);
    });

    const pageFile = filteredThisDirectoryItems.find((item) => PAGE_FILE_NAMES.includes(item));
    if (pageFile) {
      outputObject.registerPage({
        directoryRelativePath: path.relative(input, targetDirectoryPath),
        importName: getImportName(path.posix.join(targetDirectoryPath, pageFile)),
      });
    }

    filteredThisDirectoryItems.forEach((item) => {
      const subDirectoryPath = path.posix.join(targetDirectoryPath, item);
      if (fs.statSync(subDirectoryPath).isDirectory()) {
        scanDirectoryRecursively(subDirectoryPath);
      }
    });
  };
  scanDirectoryRecursively(input);

  const text = outputObject.toText().trim().slice(2).slice(0, -2);

  return { imports, text };
};
