import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/availableIds`)
  const ids = await data.json()

  const fields = ids.map((id: string) => ({
    loc: `https://lwaero.net/products/${id}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
  }))

  const fieldsRu = ids.map((id: string) => ({
    loc: `https://lwaero.net/ru/products/${id}`,
    lastmod: new Date().toISOString(),
    priority: 0.5,
  }))

  return getServerSideSitemap(ctx, [...fields, ...fieldsRu])
}

// Default export to prevent next.js errors
export default () => {
}
