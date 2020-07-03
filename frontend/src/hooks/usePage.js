import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useKirbyAPI } from './useKirbyApi'

export const usePage = () => {
  const { path } = useRoute()
  const { getPage } = useKirbyAPI()

  // Transform route `path` to `pageId` for use with api
  const pageId = (path.endsWith('/') ? path.slice(0, -1) : path).slice(1) || 'home'

  // Setup reactive `page` object with some commonly used keys
  const page = reactive({
    title: null,
    metaTitle: null,
    children: null,
    text: null
  })

  ;(async () => {
    let pageData

    try {
      // Get page from cache or freshly fetch it
      pageData = await getPage(pageId)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[KirbyAPI] Failed to fetch page by id:', pageId)
      }

      // Fall back to error page
      pageData = await getPage('error')
    }

    Object.assign(page, { ...pageData })

    // Set document title
    document.title = page.metaTitle
  })()

  return page
}