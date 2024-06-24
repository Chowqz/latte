class HashRouter {
  constructor(props) {
    this.routes = props.routes
    this.routerView = document.querySelector(props.routerView)

    window.addEventListener('load', this.render.bind(this))
    window.addEventListener('hashchange', e => {
      console.log(e)
      this.render()
    })
  }

  render() {
    const route = this.routes.find(item => item.path === location.hash)
    if (route) {
      this.routerView.innerHTML = route.component
    } else {
      this.routerView.innerHTML = ''
    }
  }

  push(path) {
    location.hash = path
  }

  replace(path) {
    location.replace(path)
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
    path: '#/home',
    component: 'home page',
  },
  {
    path: '#/about',
    component: 'about page',
  },
  {
    path: '#/list',
    component: 'list page',
  },
  {
    path: '#/detail',
    component: 'detail page',
  },
]

const RouterInstacne = new HashRouter({
  routerView: '#router-view',
  routes: routes,
})

document.querySelector('#push-btn').addEventListener('click', () => {
  RouterInstacne.push('#/list')
})

document.querySelector('#replace-btn').addEventListener('click', () => {
  RouterInstacne.replace('#/detail')
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
