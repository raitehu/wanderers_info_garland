import { Noto_Serif_JP } from "next/font/google";
import { Metadata } from "next";
import ToastProvider from "./_components/Toaster";
import "./reset.css";

const NotoSerifJP = Noto_Serif_JP(
  {
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap"
  }
)

export const metadata: Metadata = {
  title: "GARLAND | VALIS_ART ネップリ一覧化&広報サービス",
  description: "バーチャルサーカス団VALIS様のファンアートのネップリを一覧化・広報するサービス",
}

export const viewport = {
  initialScale: 1,
  width: "device-width"
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${NotoSerifJP.className}`}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <ToastProvider>
          { children }
        </ToastProvider>
        <div id="root">{ children }</div>
      </body>
    </html>
  )
}
