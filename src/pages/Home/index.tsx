import React, { Suspense, useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { Layout, Menu, MenuProps, Spin } from 'antd'
import { RouteConfig, RouteItem } from '~/router'
import styles from './index.module.less'

type MenuItem = Required<MenuProps>['items'][number]

const { Sider, Header, Content } = Layout

function getItems(routes: RouteItem[]): MenuItem[] {
  return routes
    .filter(item => item.isMenuItem)
    .map(item => {
      const { path, name, icon, children } = item
      return {
        key: path,
        label: name,
        icon,
        children: children ? getItems(children) : undefined,
      }
    })
}

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const items = getItems(RouteConfig)

  const handleMenuItemClick = ({ key }: { key: string }) => {
    console.log(key)
    navigate(key)
  }

  useEffect(() => {
    console.log('mounted')
  }, [])

  console.log(location)

  return (
    <Layout className={styles.container}>
      <Sider width="260">
        <div className={styles.systemNameWrapper}>
          <h3 className={styles.systemName}>React</h3>
        </div>
        <Menu
          className={styles.menu}
          mode="inline"
          items={items}
          onClick={handleMenuItemClick}
        />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Suspense
            fallback={
              <div className={styles.loadingContainer}>
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Home
