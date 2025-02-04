export interface PageStaticProps<TSlug> {
    params: Promise<TSlug>
}