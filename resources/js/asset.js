import ActionButtonSelector from './components/ActionButtonSelector'
import InlineActionDropdown from './components/InlineActionDropdown'

Nova.booting(app => {
  app.component('DetailActionDropdown', ActionButtonSelector)
  app.component('InlineActionDropdown', InlineActionDropdown)
})
