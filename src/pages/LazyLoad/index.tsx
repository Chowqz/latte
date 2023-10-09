import React, { useEffect } from 'react'
import ImageData from './images.json'
import { LazyLoad } from './LazyLoad'
import './index.less'

const LazyloadDemo = () => {
  useEffect(() => {
    // lazyLoad()
    // window.addEventListener('scroll', lazyLoad)
    new LazyLoad({
      className: 'lazy-load-img',
      root: document.querySelector('.image-container'),
    })
  }, [])

  return (
    <>
      <div className="image-container">
        {ImageData.list.slice(0).map(item => {
          const path = item.equalw_url.split('.cfp.cn')[0].slice(1)
          const source = item.equalw_url.split('.cfp.cn')[1]
          return (
            <div className="image-item" key={item.id}>
              <img
                className="lazy-load-img"
                data-lazy-load={`${path}${source}`}
                alt="test"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default LazyloadDemo
