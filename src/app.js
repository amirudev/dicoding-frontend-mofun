import 'regenerator-runtime'

import './style/style.css'

import main from './scripts/view/main.js'

document.addEventListener('DOMContentLoaded', async () => {
  await main()
  await import('bootstrap/dist/css/bootstrap.min.css')
  await import('bootstrap/dist/js/bootstrap.bundle.min')
})
