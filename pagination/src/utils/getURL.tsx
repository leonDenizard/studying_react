export function getURL(url: string | null){

    if(!url) return undefined

    const parsedUrl = new URL(url)
    const page = parsedUrl.searchParams.get("page")

    return page ? Number(page): undefined
}