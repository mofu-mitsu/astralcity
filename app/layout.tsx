import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://astralcity.vercel.app'),
  title: 'ASTRAL CITY | ホーナイ×ハーモニクス エニアグラム宇宙観測所【9タイプ・ウィング・トライタイプ診断】',
  description:
    '【無料】エニアグラムのホーナイ三分類（対人姿勢）×ハーモニクス三分類（問題対処）の3×3マトリクスから、あなたの深層心理を精密観測。全9タイプの引力強度、ウィング（Wing）、トライタイプ（Tritype）を幾何学チャートで照らし出します。',
  keywords: [
    'エニアグラム',
    'ホーナイ三分類',
    'ハーモニクス三分類',
    'トライタイプ',
    'ウィング',
    'エニアグラム診断',
    '性格診断',
    '心理テスト',
    'ASTRAL CITY',
    'タイプ5',
    '自己主張型',
    '追従型',
    '遊離型',
    'ポジティブ',
    'コンピテント',
    'リアクティブ',
  ],
  authors: [{ name: 'ASTRAL CITY Observatory' }],
  creator: 'ASTRAL CITY Observatory',
  publisher: 'ASTRAL CITY Observatory',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: 'https://astralcity.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://astralcity.vercel.app',
    siteName: 'ASTRAL CITY — エニアグラム宇宙観測所',
    title: 'ASTRAL CITY | ホーナイ×ハーモニクス エニアグラム宇宙観測所【9タイプ・ウィング・トライタイプ診断】',
    description:
      'ホーナイ三分類×ハーモニクス三分類の3×3マトリクスから、あなたという星を観測する本格エニアグラム診断。全9タイプ引力グラフ、ウィング、トライタイプを多角的に解き明かします。',
    images: [
      {
        url: 'https://astralcity.vercel.app/ogp.png',
        width: 1200,
        height: 630,
        alt: 'ASTRAL CITY - ホーナイ×ハーモニクス エニアグラム宇宙観測所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASTRAL CITY | ホーナイ×ハーモニクス エニアグラム宇宙観測所【9タイプ・ウィング・トライタイプ診断】',
    description:
      'ホーナイ三分類×ハーモニクス三分類の二軸から、あなたという星を観測する本格エニアグラム診断。',
    images: ['https://astralcity.vercel.app/ogp.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ASTRAL CITY',
  url: 'https://astralcity.vercel.app',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'All',
  description:
    'エニアグラムのホーナイ三分類×ハーモニクス三分類の二軸から深層心理を精密観測するWebアプリケーション。',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
  image: 'https://astralcity.vercel.app/ogp.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GNTX973GET"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GNTX973GET');
          `}
        </Script>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#070913] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
