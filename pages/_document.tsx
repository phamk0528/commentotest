import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

function dedupe<T extends { file: string }>(bundles: T[]): T[] {
    const files = new Set<string>();
    const kept: T[] = [];

    for (const bundle of bundles) {
        if (files.has(bundle.file)) continue;
        files.add(bundle.file);
        kept.push(bundle);
    }
    return kept;
}

type DocumentFiles = {
    sharedFiles: readonly string[];
    pageFiles: readonly string[];
    allFiles: readonly string[];
};

/**
 * Custom NextScript to defer loading of unnecessary JS.
 * Standard behavior is async. Compatible with Next.js 10.0.3
 */
class DeferNextScript extends NextScript {
    getDynamicChunks(files: DocumentFiles) {
        const { dynamicImports, assetPrefix, isDevelopment, devOnlyCacheBusterQueryString } = this.context;

        return dedupe(dynamicImports).map((bundle) => {
            if (!bundle.file.endsWith('.js') || files.allFiles.includes(bundle.file)) return null;

            return (
                <script
                    defer={!isDevelopment}
                    key={bundle.file}
                    src={`${assetPrefix}/_next/${encodeURI(bundle.file)}${devOnlyCacheBusterQueryString}`}
                    nonce={this.props.nonce}
                    crossOrigin={this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN}
                />
            );
        });
    }
    getScripts(files: DocumentFiles) {
        const { assetPrefix, buildManifest, isDevelopment, devOnlyCacheBusterQueryString } = this.context;

        const normalScripts = files.allFiles.filter((file) => file.endsWith('.js'));
        const lowPriorityScripts = buildManifest.lowPriorityFiles?.filter((file) => file.endsWith('.js'));

        return [...normalScripts, ...lowPriorityScripts].map((file) => {
            return (
                <script
                    key={file}
                    src={`${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`}
                    nonce={this.props.nonce}
                    defer={!isDevelopment}
                    crossOrigin={this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN}
                />
            );
        });
    }
}
export default class Document extends NextDocument {
    static getInitialProps(ctx: DocumentContext) {
        return NextDocument.getInitialProps(ctx);
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&amp;family=Rajdhani:wght@300;400;500;600;700&amp;display=swap"
                        data-react-helmet="true"
                    ></link>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-5XWJB6S7FB" />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5XWJB6S7FB');
                    `,
                        }}
                    />
                    <script data-ad-client="ca-pub-3809012033706290" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </Head>
                <body>
                    <ColorModeScript initialColorMode="light" />
                    <Main />
                    <DeferNextScript />
                </body>
            </Html>
        );
    }
}
