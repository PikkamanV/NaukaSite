---
title: 静的サイトを@nuxt/contentで作った
img: /posts/no_image_yoko.jpg
alt: NO IMAGE
tags: ['Nuxt.js', 'JavaScript']
createdAt: 2021-01-01 00:00:01
---

## 動的か静的か
実のところブログを作る計画は前々から持っており、ドメインは取得してあったしWordPressをレンタルサーバにインストールするところまではやってあった。
しかしWordPressは私がやりたいことに対してできることが過剰である一方、テーマやらプラグインやらを整備するのが面倒くさく、ドメイン代だけ払って放置していたのである。
<!--more-->
今回の要件は以下の通りであった。
- 費用がほぼ無料である
  - アクセスは月に数十あれば良い方と見込んでいるので、お金をかけたくない
  - ドメイン代は許容
- コメント機能は不要
  - 記事の間違いを正してもらえる可能性があるというメリットはあるが、荒らしやクソリプの対処の方が面倒くさい
- リアルタイムな発信は不要
  - Twitterでやれ
- markdownで記事を書ける
  - 慣れの問題
- カスタマイズで不自由しない
  - ここで言う不自由しないとは変更が簡単という意味ではなく、自分の意図通りに変更しやすいという意味
- 最悪放置できる
  - 放置していたら脆弱性を突かれて対応に追われるとか嫌だ

ということで、要件を吟味するとWordPressのような動的サイトよりもフロントエンドで完結する静的サイトの方が向いていることが分かってきた。
もちろんWordPressでも頑張ればできるが、頑張りたくなかった。
そこで[markdown-it](https://github.com/markdown-it/markdown-it)でも使ってmdファイルをこねこねするかと考えながら1年くらい放置していたところ（ひどい）、[@nuxt/content](https://github.com/nuxt/content)がこなれてきたので採用することにした。

## @nuxt/content
[@nuxt/content](https://github.com/nuxt/content)は `content` 以下にmarkdownなどで書いた記事を置いてHeadless CMSのように振る舞わせることができるモジュールである。
記事をgitで管理できるので異なるマシンで記事を書けるし差分や履歴を参照するのも簡単だ。

以下の例では `content/posts` 以下に並列で記事をおいていき、slugをファイル名にすることで目的の記事を取得している。
```vue
<div class="content-body">
  <nuxt-content :document="post" />
</div>
```
```js
async asyncData ({ $content, params }) {
  const post = await $content('posts', params.slug).fetch()
  return { post }
}
```
またyamlで記事の情報を記述することができる。
記事の作成日時 `createdAt` と更新日時 `updatedAt` はデフォルトではmarkdownファイル自体の情報が使われるが、ここで上書きすることができる。
意図しない更新によって記事の順序が乱れるのを防ぐのに便利だ。
```yaml
title: 静的サイトを@nuxt/contentで作った
tags: ['Nuxt.js', 'JavaScript']
createdAt: 2021-01-01 00:00:01
```
詳しい使い方は[公式ドキュメント](https://content.nuxtjs.org/)を参照されたい。特に[snippets](https://content.nuxtjs.org/snippets)にはよくある機能の実装例が紹介されており使いやすい。

## 作ったあれこれ
### デザイン
適当なCSSフレームワークを使うことも考えたが、せっかくなのでフロントエンドのリハビリもかねて自前で書くことにした。
業務でCSS Grid Layoutを採用したことがなかったので使ってみた。レスポンシブ対応をもっとすっきり書けそうなのでそのうち書き直しそう。
はじめかわいい見た目にするためにピンクをふんだんに使っていたが、どう見ても成年向けなサイトになってしまったので、背景を薄いグレーにして落ち着かせた（はずだ）。
あと昔からCSSの命名が苦手なのでどうにかしたい。

### URL
静的にブログを作ると決めたらまずURLを固定しなくてはならない。
将来記事のURLを変更すると、その記事をブックマークしていた人がアクセスできなくなってしまうからだ。
リダイレクトさせることもできるだろうが、そんな面倒な管理をしたくないので静的サイトにしているのである。

よくあるブログのように `/post/2021/01/202101011200` や `/post/2021/01/slug` として投稿日時を含んで期間別に表示できるようにすることも考えたが、二重管理になって面倒なのでシンプルに `/post/slug` の形式にした。
VSCodeとgitで記事を書いているので、同じ階層にすべての記事が並んでいても今編集しているものを見失うことはないだろう。

ちなみに、記事中に含まれる画像は `static/post/slug/` 以下に置くことにした。が、いきなりこの記事で使う画像がなかったので[いらすとやさんのNO IMAGE](https://www.irasutoya.com/2020/04/no-image.html)を拝借した。このような共通ファイルは `static/posts/` 以下に置くことにする。

### タグ検索
記事のタグは上述のようにmarkdown冒頭にリストで書くことにした。
以下は指定したタグの記事のみを取ってくるようにするサンプルである。

```js
async asyncData ({ $content, params }) {
  const posts = await $content('posts', params.slug)
    .where({ tags: { $contains: params.tag } })
    .only(['title', 'description', 'img', 'slug', 'createdAt', 'tags'])
    .sortBy('createdAt', 'desc')
    .fetch()
  return {
    posts
  }
}
```

こうして各タグから記事一覧を取得することはできるが、タグ自体の一覧はまだ取ることができない。
おそらく書き出し時に使われているタグをすべて列挙するようなスクリプトを書くことになりそうだ。

## まとめ
@nuxt/contentを使って個人サイトを作った。
ぼちぼち記事の執筆や機能追加をしていこうと思う。思うだけならただなので。
