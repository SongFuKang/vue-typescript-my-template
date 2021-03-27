export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

const title = '测试小Bug' // 设置标签名
export const getPageTitle = (pageTitle: string) => pageTitle ? `${pageTitle} - ${title}` : `${title}`
