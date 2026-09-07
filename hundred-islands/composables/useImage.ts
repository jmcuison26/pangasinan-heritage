export function useImage() {
  const base = process.env.GITHUB_ACTIONS ? '/pangasinan-heritage' : ''

  function img(path: string): string {
    return `${base}${path}`
  }

  return { img }
}
