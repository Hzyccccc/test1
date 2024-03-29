import defaultSettings from '@/settings'

const title = defaultSettings.title || '智能售药终端'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
