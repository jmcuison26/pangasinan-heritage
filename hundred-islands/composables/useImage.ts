export function useImage() {
  const config = useRuntimeConfig()
  const base = (config.public.imageBase as string) ?? ''

  function img(path: string): string {
    return `${base}${path}`
  }

  return { img }
}
