"use client"

import { useState, useEffect } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

import "./List.css";

interface Tweet {
  ExpireDate: string;
  TweetURL: string;
}

const timeFormat = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() start from 0
  const day = date.getDate();
  const hour = date.getHours();

  return `${year}/${month}/${day} ${hour}`;
}

const tweetId = (tweetURL: string): string => {
  return tweetURL.replace(/\/$/, '').split('/').slice(-1)[0];
}


export function List() {
  const [data, setData] = useState<Tweet[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/tweetList/", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setData(data.Items))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (data === null || data.length === 0) {
    return (
      <div className="advertisementArea">
        <p className="noIllustsMessage outline">現在登録されているネップリはありません</p>
      </div>
    )
  } else {
    return (
      <div className="advertisementArea">
        <h2 className="outline">ネップリ一覧</h2>
        {data.map((item, index) => (
          <div className="advertisement" key={index}>
            <p className='expireDate outline'>
              <span>{timeFormat(item.ExpireDate)}</span>時頃まで
            </p>
            <TwitterTweetEmbed tweetId={tweetId(item.TweetURL)} />
          </div>
        ))}
      </div>
    );
  }
}
