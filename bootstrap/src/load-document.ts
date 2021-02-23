export interface IDocumentLoaderConfig {
  timeout: number;
}

export const DEFAULT_DOCUMENT_LOADER_CONFIG = {
  timeout: 1000 * 5,
}

export function loadDocument(url: string, config: IDocumentLoaderConfig = DEFAULT_DOCUMENT_LOADER_CONFIG) {
  const controller = new AbortController()

  const timeoutId = setTimeout(() => controller.abort(), config.timeout)

  return fetch(url, { signal: controller.signal })
    .then((response: Response) => {
      clearTimeout(timeoutId)
      return response.text();
    })
    .then((text: string) => new DOMParser().parseFromString(text, 'text/html'))
}
