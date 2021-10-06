# Nature Remo Mac Menu Bar

## 概要
Nature Remo APIを使用して温度、湿度、照明の明るさ、絶対湿度をMacのメニューバーに表示することができます。
<img width="269" alt="スクリーンショット 2021-10-06 15 40 19" src="https://user-images.githubusercontent.com/32351460/136152826-8d7ca325-bc01-48cb-9f7a-591d8a9a83a3.png">


## セットアップ
.envファイルを作成後
```
$ touch .env 
```

.envファイルにNature RemoのAPI KEYの入力してください。
```
NATURE-REMO-API-KEY=hogehogehoge
```

必要なライブラリをインストールします。
```
$ npm install
```

## 実行

```
$ npm run start
```

## ビルド
```
$ npm run build
```


## Links

- [参考にしたリポジトリ](https://github.com/Neos21/practice-electron-tray-app)
