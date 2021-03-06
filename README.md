# Restaurant-App

## 使い方

| レストラン一覧画面                                                                                                                             | 検索絞り込み設定画面                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| ![スクリーンショット 2020-01-04 4 22 43](https://user-images.githubusercontent.com/46975885/71744485-b8533400-2eaa-11ea-877e-c3f1f1b03e89.png) | ![スクリーンショット 2020-01-04 4 22 57](https://user-images.githubusercontent.com/46975885/71744489-bab58e00-2eaa-11ea-9864-7d3dae71c608.png) |
|                                                                                                                                                |

- レストランの一覧を表示します。フリーワードでの検索が可能です。
  - ページ最下点までスクロールすると、次の件数を取得できます。(画面の例だと、最下点までスクロールすると、次の 10 件の結果が取得され、20 件の結果が表示されます。)
- 検索絞り込み設定画面から、任意の項目で結果を絞り込めます。
  - ブラウザで位置情報を許可すると、「ここから - m 以内」オプションを使用できます。

## 使用技術

- TypeScript (v 3.7.4)
- React
- Material-UI (デザイン用フレームワーク)
- Webpack (TypeScript のビルド & モジュールのバンドル)
- Emotion (CSS in JS)
- Apollo-Client (サーバーからのデータ取得)
- Zeit now (ホスティング)

## URL

以下からアクセスできます。(\* PC 画面サイズ非対応)

https://restaurant-app.keiffff.now.sh/
