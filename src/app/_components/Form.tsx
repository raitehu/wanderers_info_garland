"use client"
import { useForm } from "react-hook-form";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Form.css";

export default function Form() {

  const { register, handleSubmit, formState: { errors },}= useForm();
  // フロントでのバリデーションに用いる正規表現
  const UrlPattern = /https:\/\/(twitter|x).com\/[0-9A-Za-z_]+\/status\/[0-9]+/i;
  // プレースホルダ
  const exampleTwitterURL = "https://x.com/Example_User/status/0000000000000000";


  // APIをコールする処理
  const onSubmit = async (data) => {
    const TweetURL = data.TweetURL.split("?")[0];
    const ExpireDate = `${data.ExpireDate.split(":")[0]}:00:00+09:00`;

    console.log(TweetURL)
    console.log(ExpireDate)
    // ここにバックエンドの登録APIを叩く処理を書く
    // 同期処理を行った後リロードする
  }

  return (
    <div className="advertisementFormArea" id="advertisementFormArea">
      <h2 className="outline">ネップリ登録</h2>
      <AnchorLink href="#forIllustrators" className="internalLink">
        登録前にご一読ください
      </AnchorLink>

      <form onSubmit={handleSubmit(onSubmit)} className="advertisementForm">
        <label className="outline">告知ツイートのURL</label>
        <input
          type="text"
          placeholder={exampleTwitterURL}
          {...register("TweetURL", {
            required: "ツイートURLが未入力です",
            pattern: {
              value: UrlPattern,
              message: "URLの形式が正しくありません"
            }
          })}
        />
        <span className="error">{ errors.TweetURL && errors.TweetURL.message }</span>

        <label className="outline">プリント期限</label>
        <input
          type="datetime-local"
          {...register("ExpireDate", {
            required: "期限が未入力です",
            validate: (data) => {
              if (new Date(data).getTime() < new Date().getTime()) { return "未来の日付を入れてください"}
            }
          })}
        />
        <span className="error">{ errors.ExpireDate && errors.ExpireDate.message }</span>

        <input type="submit" className="submitButton" />
      </form>
    </div>
  )
}
