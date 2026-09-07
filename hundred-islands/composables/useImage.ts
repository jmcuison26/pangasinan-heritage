export function useImage() {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL?.replace(/\/$/, '') ?? ''

  function img(path: string): string {
    // path should start with /images/...
    return `${baseURL}${path}`
  }

  return { img }
}
