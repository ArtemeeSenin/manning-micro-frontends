const MFE_KEY = 'mfe';
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
  const baseElement = document.createElement('base');
  baseElement.setAttribute('href', `/mfe/${microFrontendName}/`);
  document.head.appendChild(baseElement);
}

export function mountMicroFrontendInPage(microFrontendName: string, microFrontendDocument: Document): void {
  addOrUpdateBaseTag(microFrontendName)

  const microFrontendHeadNodes = Array.from(microFrontendDocument.querySelectorAll<HTMLElement>('head>*'));
  const microFrontendBodyNodes = Array.from(microFrontendDocument.querySelectorAll<HTMLElement>('body>*'));
  const headNodes = microFrontendHeadNodes.map(adoptNodeToDocument(document))
  const bodyNodes = microFrontendBodyNodes.map(adoptNodeToDocument(document))
  const clonedNodes = headNodes.concat(bodyNodes);
  clonedNodes.forEach((node: HTMLElement) => node.dataset[MFE_KEY] = microFrontendName)
  const appendNode = (parent: Element) => (child: Element) => parent.appendChild(child);
  headNodes.forEach(appendNode(document.head));
  bodyNodes.forEach(appendNode(document.body));
}

export function unmountMicroFrontendFromPage(microFrontendName: string): void {
  const nodeSelector = `[data-${MFE_KEY}="${microFrontendName}"]`;
  const nodes = document.querySelectorAll<HTMLElement>(nodeSelector);
  nodes.forEach((node: HTMLElement) => node.remove());
}
