import React, { lazy, ReactNode } from 'react'
import { RouteObject } from 'react-router-dom'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import NotFound from '~/pages/NotFound'

export interface RouteItem {
  name: string
  path: string
  component?: string
  isMenuItem?: boolean
  icon?: ReactNode
  children?: RouteItem[]
  access?: string | string[]
}

export const RouteConfig: RouteItem[] = [
  {
    name: 'Modal',
    path: '/modal',
    component: './pages/Modal',
    isMenuItem: true,
    icon: <AppstoreOutlined />,
  },
  {
    name: 'ads',
    path: '/ads',
    isMenuItem: true,
    children: [
      {
        name: 'Search Ads',
        path: '/ads/search-ads',
        component: './pages/SearchAds',
        isMenuItem: true,
      },
      {
        name: 'Rcmd Ads',
        path: '/ads/rcmdAds',
        component: './pages/RcmdAds',
        isMenuItem: true,
        icon: <MailOutlined />,
      },
      {
        name: 'Ads Detail',
        path: '/ads/detail/:id',
        component: './pages/Detail',
      },
    ],
  },
  {
    name: 'React Transition Group',
    path: '/react-transition-group',
    component: './pages/Transition',
    isMenuItem: true,
  },
  {
    name: 'Promise',
    path: '/promise',
    component: './pages/Promise',
    isMenuItem: true,
  },
  {
    name: 'Promise',
    path: '/promise/promise-plus-demo',
    component: './pages/Promise/PromisePlusDemo',
  },
]

const getRoutes = (routes: RouteItem[]) => {
  return routes.reduce<RouteObject[]>((total, item) => {
    const { path, component, children } = item
    if (children) {
      total.push(...getRoutes(children))
    } else {
      const Element = lazy(() => import(/* @vite-ignore */ '../' + component))
      total.push({
        path: path.slice(1),
        element: <Element />,
      })
    }
    return total
  }, [])
}

export const genRouteMap = () => {
  const bizRoutes = getRoutes(RouteConfig)
  return [
    {
      path: '/',
      element: <Home />,
      children: bizRoutes,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ] as RouteObject[]
}
