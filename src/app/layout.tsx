import { Props } from "next/script";
import { Noto_Serif_JP } from "next/font/google";
import ToastProvider from "./_components/Toaster";
import "./reset.css";

const NotoSerifJP = Noto_Serif_JP(
  {
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap"
  }
)

export const metadata = {
  title: "GARLAND | VALIS_ART ネップリ一覧化&広報サービス",
  description: "バーチャルサーカス団VALIS様のファンアートのネップリを一覧化・広報するサービス",
  charset: "utf-8",
  "theme-color": "#000000"
}

export const viewport = {
  initialScale: 1,
  width: "device-width"
}

export default function RootLayout({ children }: Props) {
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
