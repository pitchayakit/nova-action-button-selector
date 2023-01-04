import DetailActionDropdown from './components/DetailActionDropdown'
import InlineActionDropdown from './components/InlineActionDropdown'
import ActionSelector from './components/ActionSelector'

Nova.booting(app => {
  app.component('DetailActionDropdown', DetailActionDropdown)
  app.component('InlineActionDropdown', InlineActionDropdown)
  app.component('ActionSelector', ActionSelector)
})
