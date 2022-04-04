export const useTranslate = (key: string) => {
  return () => {
    return 'i18n_translated_key: ' + key
  }
}
