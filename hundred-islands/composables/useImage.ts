export function useImage() {
  function img(path: string): string {
    // path should start with /images/...
    // useAsset handles the base URL automatically via Nuxt
    return path
  }

  return { img }
}
