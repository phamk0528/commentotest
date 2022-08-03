import { GetStaticProps } from 'next';
import Article from '../../components/views/article/Article';
import { Post } from '../../interfaces';
import { useGetAllArticles, useCount, useGetArticles } from '../../helpers/articles';
import NextStories from '../../components/views/article/NextStories';
import { NextSeo, ArticleJsonLd, BreadcrumbJsonLd, BlogJsonLd, SiteLinksSearchBoxJsonLd,NewsArticleJsonLd } from 'next-seo';
import Products from '../../components/views/article/Products';
import { useState, useEffect } from 'react';
import { useGetProductById } from '../../helpers/product';
import { getProductIds } from '../../helpers/commonFuction';
import { useRouter } from 'next/router';
import { Box, Center, Text } from '@chakra-ui/react';
type Props = {
    article?: any;
    articlesNextStories?: any;
    morePosts?: Post[];
    errors?: string;
};

const PostDetail = ({ article, articlesNextStories }: Props) => {
    const router = useRouter();
    if (router.isFallback) {
        return (
            <Box
                pl={{ base: '0px', lg: '70px' }}
                pr={{ base: '0px', lg: '70px' }}
                d="flex"
                flexDirection="column"
                flex="4"
                as="section"
                marginY={'.7em'}
            >
                <Center>
                    <Text fontWeight="bold" fontSize="xl">
                        Loading Page
                    </Text>
                </Center>
            </Box>
        );
    }

    const [products, setProducts] = useState<Array<any>>([]);

    useEffect(() => {
        useCount(article.id,{views:+article.views+1})
    }, []);

    if (article.products) {
        const productIds = getProductIds(article.products);
        useEffect(() => {
            const result = productIds.map((id: string) => {
                return useGetProductById(id);
            });
            Promise.all(result).then((res) => setProducts(res));
        }, [article]);
    }    

    return (
        <>
            <NextSeo
                title={article.title}
                description={article.summary}
                canonical={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.slug}`}
                openGraph={{
                    url: process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.slug}`,
                    title: article.title,
                    description: article.summary,
                    images: [
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`,
                            width: 800,
                            height: 600,
                            alt: article.title,
                        },
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`,
                            width: 900,
                            height: 800,
                            alt: article.title,
                        },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`},
                        {  url:process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`},
                    ],
                }}
            />
            <ArticleJsonLd
                url={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.slug}`}
                title={article.title}
                images={['https://api.playitright.tv' + `${article.hero_desktop.url}`]}
                datePublished={article.published_at}
                dateModified={article.createdAt}
                authorName={article.author}
                publisherName={article.author}
                publisherLogo={'https://api.playitright.tv' + `${article.hero_desktop.url}`}
                description="This is a mighty good description of this article."
            />

            <BreadcrumbJsonLd
                itemListElements={[
                    {
                        position: 1,
                        name: articlesNextStories[0].title,
                        item: 'https://playitright.tv/'+articlesNextStories[0].slug,
                    },
                    {
                        position:2,
                        name: articlesNextStories[1].title,
                        item: 'https://playitright.tv/'+articlesNextStories[1].slug,
                    },
                ]}
            />

            <BlogJsonLd
                url={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.slug}`}
                title={article.title}
                images={[process.env.NEXT_PUBLIC_BASE_URL +`${article.hero_desktop.url}`]}
                datePublished={article.published_at}
                dateModified={article.createdAt}
                authorName={article.author}
                description={article.summary}
            />

            <SiteLinksSearchBoxJsonLd
                url="https://playitright.tv/"
                potentialActions={[
                    {
                        target: process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/`,
                        queryInput: 'PlayItRightTv',
                    },
                ]}
            />
            <NewsArticleJsonLd
                 url={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.slug}`}
                title={article.title}
                images={[process.env.NEXT_PUBLIC_BASE_URL +`${article.hero_desktop.url}`]}
                section="politic"
                keywords={article.title}
                dateCreated={article.published_at}
                datePublished={article.published_at}
                dateModified={article.createdAt}
                publisherName="PlayitRight TV"
                authorName={article.author}
                description={article.summary}
                publisherLogo={process.env.NEXT_PUBLIC_BASE_URL +`${article.hero_desktop.url}`}
                body={article.body}
            />

            <Article article={article} />
            <NextStories articleId={article.id} articles={articlesNextStories} />
            {products ? <Products products={products} /> : null}
        </>
    );
};

export default PostDetail;

export async function getStaticPaths() {
    let data = await useGetAllArticles();
    const paths = data.map((article: any) => {
        return {
            params: {
                slug: article.slug.toString(),
            },
        };
    });
    return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;
        let data = await  useGetArticles(`slug=${slug}`);     
        let dataNextStories = await useGetArticles(`slug_ne=${slug}&_sort=public_date:DESC&_start=0&_limit=2`);
        return { props: { article: data[0], articlesNextStories: dataNextStories }, revalidate: 10 };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};
