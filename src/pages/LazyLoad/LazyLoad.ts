export function lazyLoad() {
  const viewHeight =
    document.documentElement.clientHeight || document.body.clientHeight
  const images: NodeListOf<HTMLImageElement> =
    document.querySelectorAll('img[data-src]')

  images.forEach(item => {
    if (!item.dataset.src) {
      return
    }
    const { top, bottom } = item.getBoundingClientRect()
    if (top < viewHeight && bottom > 0) {
      item.src = item.dataset.src
      item.removeAttribute('data-src')
    }
  })
}

interface Props extends IntersectionObserverInit {
  className: string
}

export class LazyLoad {
  observerInstance: IntersectionObserver
  className: string
  constructor(props: Props) {
    const { className, ...options } = props
    this.className = className

    this.observerInstance = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.lazyLoad
          if (src) {
            img.src = src
            img.removeAttribute('data-lazy-load')
          }
          self.unobserve(img)
        }
      })
    }, options)

    this.observe()
  }

  observe() {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll(
      `.${this.className}[data-lazy-load]`,
    )
    images.forEach(img => {
      this.observerInstance.observe(img)
    })
  }

  refresh() {
    this.observe()
  }
}
