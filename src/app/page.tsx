"use client"
import "./index.css"
import "./App.css"
import { Form } from "./_components/Form"
import { List } from "./_components/List"
import AnchorLink from "react-anchor-link-smooth-scroll";

export default function Page() {
  return (
    <div className="App">
      <div className="header">
        <h1 className='outline'>
          <span data-ruby="ガーランド">GARLAND</span>
        </h1>
        <p className='h1sub outline'>#VALIS_ART ネップリ一覧化サービス</p>
      </div>

      <Form />
      <List />

      <div className='footer'>
        <h2>GARLAND(ガーランド)について</h2>
        <p>
          GARLAND(以下本サービス)はバーチャルサーカス団VALIS様のファンアートのネップリを広報することを目的としています。
          <br />
          本サービスの開発・運営はVALIS公式様とは無関係の、有志のファンによって行っていますので、本サービスへの質問やお問合せはVALIS公式様ではなく<a href='https://x.com/WANDERERSINFO'>WANDERER&apos;S INFO運営</a>のDMまでお願いいたします。
        </p>

        <h3>ご利用のみなさまへ</h3>
        <p>
          本サービスでVALIS_ARTとは無関係なツイートの告知や、不適切表現を含む画像や文面のツイートが告知された場合はお手数ですが<a href='https://x.com/WANDERERSINFO'>WANDERER&apos;S INFO運営</a>のDMまでご連絡ください。
          <br />
          現段階では気軽にお使いいただくことを目的としているため登録時に絵師様の本人確認を行っておりませんが、問題が発生した際には事前の告知なくアカウントの制限や本人確認機能の追加、最悪のケースではサービスのクローズを行う可能性があります。
          <br />
          誰しもが快適に使い続けられるよう、思いやりと節度を持ったご利用をお願いいたします。
        </p>

        <h3 id="forIllustrators">登録される方へ</h3>
        <p>
          本サービスにはどなた様も無償で告知ツイートを登録することができます。
          <br />
          ただし、サービスへの登録は絵師様ご本人のみが行っていただき、第三者が行うことはご遠慮ください。
          <br />
          登録いただくことで有効期限内の一覧ページへの掲載と引用RTによる自動告知が行われます。
          <br />
          期限切れとなった告知ツイートは自動的にサイトから削除されますのでご対応いただく必要はありません。
          <br />
          誤って登録されて内容を変更したい場合や、期限内の削除を行いたい場合は<a href='https://x.com/WANDERERSINFO'>WANDERER&apos;S INFO運営</a>のDMまでご連絡ください。
          <br />
          内容に不適切な表現が含まれると運営が判断した場合や削除依頼があった場合は事前のご連絡無く削除を行うことがあります。
          <br />
          本サービスでは<a href="https://kamitsubaki.jp/guidelines/">KAMITSUBAKI STUDIO 二次創作ガイドライン</a>を不適切表現の基準といたします。
          <br />
          <AnchorLink href="#advertisementFormArea" className="internalLink">
            ネップリ登録へ戻る
          </AnchorLink>
        </p>

        <h3>公式様</h3>
        <dl>
          <dt>X</dt>
          <dd><a href='https://x.com/VALIS_Official'>@VALIS_Official</a></dd>
          <dt>YouTube</dt>
          <dd><a href='https://www.youtube.com/c/VALIS_Official'>VALIS</a></dd>
          <dt>セカンドチャンネル</dt>
          <dd><a href='https://www.youtube.com/@mugenshoujo_valis'>無限少女ヴァリス</a></dd>
          <dt>公式サイト</dt>
          <dd><a href='https://valis.kamitsubaki.jp/'>VALIS</a></dd>
          <dt>所属スタジオ</dt>
          <dd><a href='https://kamitsubaki.jp/'>KAMITSUBAKI STUDIO</a></dd>
        </dl>

        <h3>開発責任者</h3>
        <a href='https://x.com/RaitehuV'>霧島らいてふ</a>
      </div>
    </div>
  )
}
