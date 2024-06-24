// pushState和replaceState不会触发popstate事件，而history的go、forward、back方法和浏览器前进后退会触发该事件
class HistoryRouter {
  constructor(props) {
    this.routes = props.routes
    this.routerView = document.querySelector(props.routerView)

    window.addEventListener('popstate', e => {
      console.log(e)
      this.render()
    })
  }

  render() {
    const route = this.routes.find(item => item.path === location.pathname)
    if (route) {
      this.routerView.innerHTML = route.component
    } else {
      this.routerView.innerHTML = ''
    }
  }

  push(path) {
    history.pushState(null, '', path)
    // 手动触发渲染方法，因为pushState不会触发popstate事件
    this.render()
  }

  replace(path) {
    history.replaceState(null, '', path)
    // 手动触发渲染方法，因为replaceState不会触发popstate事件
    this.render()
  }

  go(index) {
    history.go(index)
  }

  forward() {
    history.forward()
  }

  back() {
    history.back()
  }
}

const routes = [
  {
    path: '/home',
    component: 'home page',
  },
  {
    path: '/about',
    component: 'about page',
  },
  {
    path: '/list',
    component: 'list page',
  },
  {
    path: '/detail',
    component: 'detail page',
  },
]

const RouterInstacne = new HistoryRouter({
  routerView: '#router-view',
  routes: routes,
})

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('li a').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()
      const path = item.getAttribute('href')
      RouterInstacne.push(path)
    })
  })
})

document.querySelector('#push-btn').addEventListener('click', () => {
  RouterInstacne.push('/list')
})

document.querySelector('#replace-btn').addEventListener('click', () => {
  RouterInstacne.replace('/detail')
})

document.querySelector('#prev-btn').addEventListener('click', () => {
  RouterInstacne.back()
})

document.querySelector('#next-btn').addEventListener('click', () => {
  RouterInstacne.forward()
})

document.querySelector('#go-btn').addEventListener('click', () => {
  RouterInstacne.go(2)
})
