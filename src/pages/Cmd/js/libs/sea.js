/* eslint-disable */
/*! Sea.js 2.2.3 | seajs.org/LICENSE.md */
!(function (a, b) {
  function c(a) {
    return function (b) {
      return {}.toString.call(b) == '[object ' + a + ']'
    }
  }
  function d() {
    return B++
  }
  function e(a) {
    return a.match(E)[0]
  }
  function f(a) {
    for (a = a.replace(F, '/'); a.match(G); ) a = a.replace(G, '/')
    return (a = a.replace(H, '$1/'))
  }
  function g(a) {
    var b = a.length - 1,
      c = a.charAt(b)
    return '#' === c
      ? a.substring(0, b)
      : '.js' === a.substring(b - 2) ||
        a.indexOf('?') > 0 ||
        '.css' === a.substring(b - 3) ||
        '/' === c
      ? a
      : a + '.js'
  }
  function h(a) {
    var b = v.alias
    return b && x(b[a]) ? b[a] : a
  }
  function i(a) {
    var b = v.paths,
      c
    return b && (c = a.match(I)) && x(b[c[1]]) && (a = b[c[1]] + c[2]), a
  }
  function j(a) {
    var b = v.vars
    return (
      b &&
        a.indexOf('{') > -1 &&
        (a = a.replace(J, function (a, c) {
          return x(b[c]) ? b[c] : a
        })),
      a
    )
  }
  function k(a) {
    var b = v.map,
      c = a
    if (b)
      for (var d = 0, e = b.length; e > d; d++) {
        var f = b[d]
        if (((c = z(f) ? f(a) || a : a.replace(f[0], f[1])), c !== a)) break
      }
    return c
  }
  function l(a, b) {
    var c,
      d = a.charAt(0)
    if (K.test(a)) c = a
    else if ('.' === d) c = f((b ? e(b) : v.cwd) + a)
    else if ('/' === d) {
      var g = v.cwd.match(L)
      c = g ? g[0] + a.substring(1) : a
    } else c = v.base + a
    return 0 === c.indexOf('//') && (c = location.protocol + c), c
  }
  function m(a, b) {
    if (!a) return ''
    ;(a = h(a)), (a = i(a)), (a = j(a)), (a = g(a))
    var c = l(a, b)
    return (c = k(c))
  }
  function n(a) {
    return a.hasAttribute ? a.src : a.getAttribute('src', 4)
  }
  function o(a, b, c, d) {
    var e = T.test(a),
      f = M.createElement(e ? 'link' : 'script')
    c && (f.charset = c),
      A(d) || f.setAttribute('crossorigin', d),
      p(f, b, e, a),
      e
        ? ((f.rel = 'stylesheet'), (f.href = a))
        : ((f.async = !0), (f.src = a)),
      (U = f),
      S ? R.insertBefore(f, S) : R.appendChild(f),
      (U = null)
  }
  function p(a, c, d, e) {
    function f() {
      ;(a.onload = a.onerror = a.onreadystatechange = null),
        d || v.debug || R.removeChild(a),
        (a = null),
        c()
    }
    var g = 'onload' in a
    return !d || (!W && g)
      ? (g
          ? ((a.onload = f),
            (a.onerror = function () {
              D('error', { uri: e, node: a }), f()
            }))
          : (a.onreadystatechange = function () {
              ;/loaded|complete/.test(a.readyState) && f()
            }),
        b)
      : (setTimeout(function () {
          q(a, c)
        }, 1),
        b)
  }
  function q(a, b) {
    var c = a.sheet,
      d
    if (W) c && (d = !0)
    else if (c)
      try {
        c.cssRules && (d = !0)
      } catch (e) {
        'NS_ERROR_DOM_SECURITY_ERR' === e.name && (d = !0)
      }
    setTimeout(function () {
      d ? b() : q(a, b)
    }, 20)
  }
  function r() {
    if (U) return U
    if (V && 'interactive' === V.readyState) return V
    for (
      var a = R.getElementsByTagName('script'), b = a.length - 1;
      b >= 0;
      b--
    ) {
      var c = a[b]
      if ('interactive' === c.readyState) return (V = c)
    }
  }
  function s(a) {
    var b = []
    return (
      a.replace(Y, '').replace(X, function (a, c, d) {
        d && b.push(d)
      }),
      b
    )
  }
  function t(a, b) {
    ;(this.uri = a),
      (this.dependencies = b || []),
      (this.exports = null),
      (this.status = 0),
      (this._waitings = {}),
      (this._remain = 0)
  }
  if (!a.seajs) {
    var u = (a.seajs = { version: '2.2.3' }),
      v = (u.data = {}),
      w = c('Object'),
      x = c('String'),
      y = Array.isArray || c('Array'),
      z = c('Function'),
      A = c('Undefined'),
      B = 0,
      C = (v.events = {})
    ;(u.on = function (a, b) {
      var c = C[a] || (C[a] = [])
      return c.push(b), u
    }),
      (u.off = function (a, b) {
        if (!a && !b) return (C = v.events = {}), u
        var c = C[a]
        if (c)
          if (b)
            for (var d = c.length - 1; d >= 0; d--) c[d] === b && c.splice(d, 1)
          else delete C[a]
        return u
      })
    var D = (u.emit = function (a, b) {
        var c = C[a],
          d
        if (c) for (c = c.slice(); (d = c.shift()); ) d(b)
        return u
      }),
      E = /[^?#]*\//,
      F = /\/\.\//g,
      G = /\/[^/]+\/\.\.\//,
      H = /([^:/])\/\//g,
      I = /^([^/:]+)(\/.+)$/,
      J = /{([^{]+)}/g,
      K = /^\/\/.|:\//,
      L = /^.*?\/\/.*?\//,
      M = document,
      N = e(M.URL),
      O = M.scripts,
      P = M.getElementById('seajsnode') || O[O.length - 1],
      Q = e(n(P) || N)
    u.resolve = m
    var R = M.head || M.getElementsByTagName('head')[0] || M.documentElement,
      S = R.getElementsByTagName('base')[0],
      T = /\.css(?:\?|$)/i,
      U,
      V,
      W =
        +navigator.userAgent.replace(
          /.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/,
          '$1',
        ) < 536
    u.request = o
    var X =
        /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
      Y = /\\\\/g,
      Z = (u.cache = {}),
      $,
      _ = {},
      ab = {},
      bb = {},
      cb = (t.STATUS = {
        FETCHING: 1,
        SAVED: 2,
        LOADING: 3,
        LOADED: 4,
        EXECUTING: 5,
        EXECUTED: 6,
      })
    ;(t.prototype.resolve = function () {
      for (
        var a = this, b = a.dependencies, c = [], d = 0, e = b.length;
        e > d;
        d++
      )
        c[d] = t.resolve(b[d], a.uri)
      return c
    }),
      (t.prototype.load = function () {
        var a = this
        if (!(a.status >= cb.LOADING)) {
          a.status = cb.LOADING
          var c = a.resolve()
          D('load', c)
          for (var d = (a._remain = c.length), e, f = 0; d > f; f++)
            (e = t.get(c[f])),
              e.status < cb.LOADED
                ? (e._waitings[a.uri] = (e._waitings[a.uri] || 0) + 1)
                : a._remain--
          if (0 === a._remain) return a.onload(), b
          var g = {}
          for (f = 0; d > f; f++)
            (e = Z[c[f]]),
              e.status < cb.FETCHING
                ? e.fetch(g)
                : e.status === cb.SAVED && e.load()
          for (var h in g) g.hasOwnProperty(h) && g[h]()
        }
      }),
      (t.prototype.onload = function () {
        var a = this
        ;(a.status = cb.LOADED), a.callback && a.callback()
        var b = a._waitings,
          c,
          d
        for (c in b)
          b.hasOwnProperty(c) &&
            ((d = Z[c]), (d._remain -= b[c]), 0 === d._remain && d.onload())
        delete a._waitings, delete a._remain
      }),
      (t.prototype.fetch = function (a) {
        function c() {
          u.request(g.requestUri, g.onRequest, g.charset, g.crossorigin)
        }
        function d() {
          delete _[h], (ab[h] = !0), $ && (t.save(f, $), ($ = null))
          var a,
            b = bb[h]
          for (delete bb[h]; (a = b.shift()); ) a.load()
        }
        var e = this,
          f = e.uri
        e.status = cb.FETCHING
        var g = { uri: f }
        D('fetch', g)
        var h = g.requestUri || f
        return !h || ab[h]
          ? (e.load(), b)
          : _[h]
          ? (bb[h].push(e), b)
          : ((_[h] = !0),
            (bb[h] = [e]),
            D(
              'request',
              (g = {
                uri: f,
                requestUri: h,
                onRequest: d,
                charset: z(v.charset) ? v.charset(h) : v.charset,
                crossorigin: z(v.crossorigin)
                  ? v.crossorigin(h)
                  : v.crossorigin,
              }),
            ),
            g.requested || (a ? (a[g.requestUri] = c) : c()),
            b)
      }),
      (t.prototype.exec = function () {
        function a(b) {
          return t.get(a.resolve(b)).exec()
        }
        var c = this
        if (c.status >= cb.EXECUTING) return c.exports
        c.status = cb.EXECUTING
        var e = c.uri
        ;(a.resolve = function (a) {
          return t.resolve(a, e)
        }),
          (a.async = function (b, c) {
            return t.use(b, c, e + '_async_' + d()), a
          })
        var f = c.factory,
          g = z(f) ? f(a, (c.exports = {}), c) : f
        return (
          g === b && (g = c.exports),
          delete c.factory,
          (c.exports = g),
          (c.status = cb.EXECUTED),
          D('exec', c),
          g
        )
      }),
      (t.resolve = function (a, b) {
        var c = { id: a, refUri: b }
        return D('resolve', c), c.uri || u.resolve(c.id, b)
      }),
      (t.define = function (a, c, d) {
        var e = arguments.length
        1 === e
          ? ((d = a), (a = b))
          : 2 === e && ((d = c), y(a) ? ((c = a), (a = b)) : (c = b)),
          !y(c) && z(d) && (c = s('' + d))
        var f = { id: a, uri: t.resolve(a), deps: c, factory: d }
        if (!f.uri && M.attachEvent) {
          var g = r()
          g && (f.uri = g.src)
        }
        D('define', f), f.uri ? t.save(f.uri, f) : ($ = f)
      }),
      (t.save = function (a, b) {
        var c = t.get(a)
        c.status < cb.SAVED &&
          ((c.id = b.id || a),
          (c.dependencies = b.deps || []),
          (c.factory = b.factory),
          (c.status = cb.SAVED))
      }),
      (t.get = function (a, b) {
        return Z[a] || (Z[a] = new t(a, b))
      }),
      (t.use = function (b, c, d) {
        var e = t.get(d, y(b) ? b : [b])
        ;(e.callback = function () {
          for (var b = [], d = e.resolve(), f = 0, g = d.length; g > f; f++)
            b[f] = Z[d[f]].exec()
          c && c.apply(a, b), delete e.callback
        }),
          e.load()
      }),
      (t.preload = function (a) {
        var b = v.preload,
          c = b.length
        c
          ? t.use(
              b,
              function () {
                b.splice(0, c), t.preload(a)
              },
              v.cwd + '_preload_' + d(),
            )
          : a()
      }),
      (u.use = function (a, b) {
        return (
          t.preload(function () {
            t.use(a, b, v.cwd + '_use_' + d())
          }),
          u
        )
      }),
      (t.define.cmd = {}),
      (a.define = t.define),
      (u.Module = t),
      (v.fetchedList = ab),
      (v.cid = d),
      (u.require = function (a) {
        var b = t.get(t.resolve(a))
        return b.status < cb.EXECUTING && (b.onload(), b.exec()), b.exports
      })
    var db = /^(.+?\/)(\?\?)?(seajs\/)+/
    ;(v.base = (Q.match(db) || ['', Q])[1]),
      (v.dir = Q),
      (v.cwd = N),
      (v.charset = 'utf-8'),
      (v.preload = (function () {
        var a = [],
          b = location.search.replace(/(seajs-\w+)(&|$)/g, '$1=1$2')
        return (
          (b += ' ' + M.cookie),
          b.replace(/(seajs-\w+)=1/g, function (b, c) {
            a.push(c)
          }),
          a
        )
      })()),
      (u.config = function (a) {
        for (var b in a) {
          var c = a[b],
            d = v[b]
          if (d && w(d)) for (var e in c) d[e] = c[e]
          else
            y(d)
              ? (c = d.concat(c))
              : 'base' === b && ('/' !== c.slice(-1) && (c += '/'), (c = l(c))),
              (v[b] = c)
        }
        return D('config', a), u
      })
  }
})(this)
