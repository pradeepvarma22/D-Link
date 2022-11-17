
import Head from 'next/head'


export default function Header({ title }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="DLink" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}