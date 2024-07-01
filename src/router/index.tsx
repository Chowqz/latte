import React, { lazy, ReactNode } from 'react'
import { RouteObject } from 'react-router-dom'
import { AppstoreOutlined } from '@ant-design/icons'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import NotFound from '~/pages/NotFound'
import LazyLoad from '~/pages/LazyLoad'
import Combat from '~/pages/Combat'
import TouchEventDelay from '~/pages/TouchEventDelay'
import ClassComponent from '~/pages/SetState/classComponent'
import FunComponent from '~/pages/SetState/FunComponent'

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
  {
    name: 'Promise',
    path: '/promise/scheduler-demo',
    component: './pages/Promise/SchedulerDemo',
  },
  {
    name: 'EventEmitter',
    path: '/event-emitter/',
    component: './pages/EventEmitter',
    isMenuItem: true,
  },
  {
    name: 'LifeCycle',
    path: '/life-cycle',
    component: './pages/LifeCycle',
    isMenuItem: true,
  },
  {
    name: 'Form',
    path: '/form',
    component: './pages/Form',
    isMenuItem: true,
  },
  {
    name: 'ErrorBoundary',
    path: '/error-boundary',
    component: './pages/ErrorBoundary',
    isMenuItem: true,
  },
  {
    name: 'SetState',
    path: '/setstate',
    children: [
      {
        name: 'Class Component',
        path: '/setstate/class-component',
        component: './pages/SetState/ClassComponent',
        isMenuItem: true,
      },
    ],
    isMenuItem: true,
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
      path: '/lazy-load',
      element: <LazyLoad />,
    },
    {
      path: '/combat',
      element: <Combat />,
    },
    {
      path: '/touch-event-delay',
      element: <TouchEventDelay />,
    },
    {
      path: '/setstate-class-component',
      element: <ClassComponent />,
    },
    {
      path: '/setstate-fun-component',
      element: <FunComponent />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ] as RouteObject[]
}
