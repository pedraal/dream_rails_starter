import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    this.detectPrefersColorScheme()
  }

  detectPrefersColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      this.toggle()
  }

  toggle() {
    document.querySelector('html')?.classList.toggle('dark')
  }
}
