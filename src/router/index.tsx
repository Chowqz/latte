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
    name: 'Dialog',
    path: '/dialog',
    component: './pages/List',
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
]

const getRoutes = (routes: RouteItem[]) => {
  return routes.reduce<RouteObject[]>((total, item) => {
    const { path, component, children } = item
    if (children) {
      total.push(...getRoutes(children))
    } else {
      const Element = lazy(() => import('../' + component))
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
