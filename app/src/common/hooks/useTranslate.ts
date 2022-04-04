export const useTranslate = (key?: string) => {
  return {
    t: () => {
      return 'i18n_translated_key: ' + key
    }
  }
}
