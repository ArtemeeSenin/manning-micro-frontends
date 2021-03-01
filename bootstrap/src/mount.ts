const MFE_KEY = 'mfe';
const CONTAINER_ID = 'micro-frontend-container';
function adoptNodeToDocument(document: Document): (node: HTMLElement) => HTMLElement {
  return function cloneNode(node: HTMLElement): HTMLElement {
    // Cloning or Adopting <scripts> nodes doesn't re-evaluate them
    if (node.tagName === 'SCRIPT') {
      const clonedNode = document.createElement(node.tagName);

      Array.from(node.attributes).forEach(attribute => clonedNode.setAttribute(attribute.name, attribute.value));
      clonedNode.innerHTML = node.innerHTML;

      return clonedNode;
    }

    return document.adoptNode(node);
  }
}

function addOrUpdateBaseTag(microFrontendName: string) {
  const existingBaseElement = document.head.querySelector('base');
  const baseElement = existingBaseElement ?? document.createElement('base');
  baseElement.setAttribute('href', `/mfe/${microFrontendName}/`);

  if (!existingBaseElement) {
    document.head.appendChild(baseElement);
  }
}

function createContainer(): HTMLElement {
  const element = document.createElement('DIV');
  element.id = CONTAINER_ID;
  document.body.appendChild(element);
  return element;
}

function makeEmpty(node: HTMLElement): void {
  node.innerHTML = '';
}

function appendNode(parent: Element) {
  return (child: Element) => parent.appendChild(child);
}

export function mountMicroFrontendInPage(microFrontendName: string, microFrontendDocument: Document): void | never {
  let container = document.body.querySelector<HTMLElement>(`#${CONTAINER_ID}`);
  if (!container) { container = createContainer(); }

  addOrUpdateBaseTag(microFrontendName)

  const microFrontendHeadNodes = Array.from(microFrontendDocument.querySelectorAll<HTMLElement>('head>*'));
  const microFrontendBodyNodes = Array.from(microFrontendDocument.querySelectorAll<HTMLElement>('body>*'));
  const headNodes = microFrontendHeadNodes.map(adoptNodeToDocument(document))
  const bodyNodes = microFrontendBodyNodes.map(adoptNodeToDocument(document))
  const clonedNodes = headNodes.concat(bodyNodes);
  clonedNodes.forEach((node: HTMLElement) => node.dataset[MFE_KEY] = microFrontendName)
  makeEmpty(container);
  headNodes.forEach(appendNode(document.head));
  bodyNodes.forEach(appendNode(container));
}

export function unmountMicroFrontendFromPage(): void {
  const nodeSelector = `[data-${MFE_KEY}]`;
  const nodes = document.querySelectorAll<HTMLElement>(nodeSelector);
  nodes.forEach((node: HTMLElement) => node.remove());
}
