import { defineBoot } from '#q-app/wrappers'
import * as LucideIcons from 'lucide-vue-next'

export default defineBoot(({ app }) => {
  // Register all Lucide icons globally
  for (const [iconName, iconComponent] of Object.entries(LucideIcons)) {
    // Skip non-component exports like createIcons, etc.
    if (typeof iconComponent === 'function' && iconName !== 'createIcons' && iconName !== 'default') {
      app.component(iconName, iconComponent)
    }
  }
})
