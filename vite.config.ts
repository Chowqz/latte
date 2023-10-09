import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const imageProxyConfig = [
  'tenfei01.cfp.cn',
  'tenfei02.cfp.cn',
  'tenfei03.cfp.cn',
  'tenfei04.cfp.cn',
  'tenfei05.cfp.cn',
  'tenfei06.cfp.cn',
  'alifei01.cfp.cn',
  'alifei02.cfp.cn',
  'alifei03.cfp.cn',
  'alifei04.cfp.cn',
  'alifei05.cfp.cn',
  'alifei06.cfp.cn',
].reduce((total, cur) => {
  const path = cur.split('.')[0]
  const reg = new RegExp(`^/${path}`)
  return {
    ...total,
    [`/${cur.split('.')[0]}`]: {
      target: `https://${cur}`,
      changeOrigin: true,
      rewrite: path => path.replace(reg, ''),
      configure: proxy => {
        proxy.on('proxyReq', proxyReq => {
          proxyReq.removeHeader('referer') // 移除请求头---最主要是设置这个
          proxyReq.removeHeader('origin') // 移除请求头---最主要是设置这个
          proxyReq.setHeader('host', cur) // 添加请求头
        })
      },
    },
  }
}, {})

console.log(imageProxyConfig)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  server: {
    port: 3008,
    proxy: {
      ...imageProxyConfig,
    },
  },
})
