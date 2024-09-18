"use client"
import { useForm } from "react-hook-form";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { toast } from "react-toastify";

import "./Form.css";

export function Form() {

  const { register, handleSubmit, formState: { errors },}= useForm();
  // フロントでのバリデーションに用いる正規表現
  const UrlPattern = /https:\/\/(twitter|x).com\/[0-9A-Za-z_]+\/status\/[0-9]+/i;
  // プレースホルダ
  const exampleTwitterURL = "https://x.com/Example_User/status/0000000000000000";

  const sleep = (time) => new Promise((r) => setTimeout(r, time));


  // APIをコールする処理
  const onSubmit = async (data) => {
    const TweetURL = data.TweetURL.split("?")[0];
    const ExpireDate = `${data.ExpireDate.split(":")[0]}:00:00+09:00`;

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TweetURL: TweetURL,
        ExpireDate: ExpireDate
      })
    };

    fetch("/api/register/", request)
      .then(async (res) => {
        if (res.status === 201) {
          toast.success("登録を受け付けました。リロードします");
          await sleep(1500);
          window.location.reload();
        } else {
          toast.error("登録に失敗しました。リロードします")
          await sleep(1500);
          window.location.reload();
        }
      })
      .catch(async () => {
        toast.error("登録に失敗しました。リロードします")
          await sleep(1500);
          window.location.reload();
      })
    return;
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
        <span className="error">{ errors.TweetURL && errors.TweetURL.message as string }</span>

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
        <span className="error">{ errors.ExpireDate && errors.ExpireDate.message as string}</span>

        <input type="submit" className="submitButton" />
      </form>
    </div>
  )
}
