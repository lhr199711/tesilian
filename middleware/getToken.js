
/**
 * 从安卓获取token，存入当前cookies
 */
export default async ({ app, query, req }) => {
    await app.$cookies.set('token', query.token, { path: '/', maxAge: 60 * 60 * 24 * 1 })
    // await app.$cookies.set('token', query.token)
}
