export const api = {
  icon: '🚀',
  name: 'posts.do',
  description: 'Cloudflare Worker Template',
  url: 'https://posts.do/api',
  type: 'https://apis.do/web',
  endpoints: {
    listCategories: 'https://posts.do/api',
    getCategory: 'https://posts.do/:type',
  },
  site: 'https://posts.do',
  login: 'https://posts.do/login',
  signup: 'https://posts.do/signup',
  subscribe: 'https://posts.do/subscribe',
  repo: 'https://github.com/drivly/posts.do',
}

export const gettingStarted = [
  `If you don't already have a JSON Viewer Browser Extension, get that first:`,
  `https://extensions.do`,
]

export const examples = {
  listItems: 'https://posts.do/key=value/ctx.do/api',
  sendWebhook: 'https://posts.do/hello=world&foo=bar/webhooks.do/2e6f16f5-d4af-4ac6-9561-59d794f136ae',
}

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathOptions, pathSegments, search, query } = await env.CTX.fetch(req).then(res => res.json())
    if (rootPath) return json({ api, gettingStarted, examples, user })
    
    // TODO: Implement this
    const [ _, ...target ] = pathSegments
    return fetch('https://' + target.join('/') + search, { method: 'POST', body: JSON.stringify(pathOptions)})
//     const data = { resource, id, hello: user.city }    
//     return json({ api, data, user })
  }
}

const json = obj => new Response(JSON.stringify(obj, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' }})
