# jp-local-gov

`pnpm install jp-local-gov`

## 機能一覧

### 都道府県

```ts
isPrefectureId('tokyo') // true

getPrefectureInfoById('osaka') // { id: 'osaka', name: '大阪府', shortName: '大阪', website: 'https://www.pref.osaka.lg.jp/', adjacentPrefectureIds: ['kyoto', 'hyogo', 'nara', 'wakayama'] }
getPrefectureInfoByName('大阪府') // { id: 'osaka', name: '大阪府', shortName: '大阪', website: 'https://www.pref.osaka.lg.jp/', adjacentPrefectureIds: ['kyoto', 'hyogo', 'nara', 'wakayama'] }
getPrefectureInfoByName('大阪')   // { id: 'osaka', name: '大阪府', shortName: '大阪', website: 'https://www.pref.osaka.lg.jp/', adjacentPrefectureIds: ['kyoto', 'hyogo', 'nara', 'wakayama'] }

// comparePrefectureIds は sort の比較関数として使用 (北海道から沖縄の順)
['okinawa', 'tokyo', 'hokkaido'].sort(comparePrefectureIds) // ['hokkaido', 'tokyo', 'okinawa']
```

* `prefectureInfos`: 全都道府県の情報一覧
* 型 `PrefectureId`: 各都道府県が定めるローマ字表記をもとに当ライブラリが定めた都道府県の ID (例: `'hokkaido'`, `'tokyo'`)

### 衆議院

各都道府県の、衆議院の小選挙区の数や、所属する比例代表ブロックとその定数などを扱います。数字は公職選挙法の改正により頻繁に変化するため、`date` 引数に `'YYYY-MM-DD'` 形式の文字列を渡す必要があり、指定した日付時点で選挙が行われた場合の結果を取得できます。

```ts
isShuHireiBlockId('kinki') // true

getShuHireiBlockName('kinki') // '近畿'
getShuHireiBlockId('近畿') // 'kinki'
getShuHireiBlockPrefectures('kinki') // ['shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama']
getShuHireiBlockForPrefecture('osaka') // { id: 'kinki', name: '近畿', prefectures: ['shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'] }

getShuDistrictCounts('2026-01-01').tokyo // 30
getShuHireiBlockSeatCounts('2026-01-01').tokyo // 19
```

* `shuElections`: 現制度 (小選挙区比例代表並立制) で行われてきた衆議院議員総選挙の一覧
* `shuHireiBlocks`: 比例ブロックの一覧
* `shuDistrictCounts1994 / 2002 / 2013 / 2017 / 2022`: YYYY年に施行された改正公職選挙法による都道府県ごとの小選挙区の数
* `shuHireiBlockSeatCounts1994 / 2000 / 2002 / 2017 / 2022`: YYYY年に施行された改正公職選挙法による比例ブロックごとの定数
* 型 `ShuHireiBlockId`: 当ライブラリが定めた比例ブロックの ID (`'hokkaido'`, `'tohoku'`, `'kitakanto'`, `'minamikanto'`, `'tokyo'`, `'hokurikushinetsu'`, `'tokai'`, `'kinki'`, `'chugoku'`, `'shikoku'`, `'kyushu'`)

### 参議院

<!-- 各都道府県の、衆議院の小選挙区の数や、所属する比例代表ブロックとその定数などを扱います。数字は公職選挙法の改正により頻繁に変化するため、date 引数に 'YYYY-MM-DD' 形式の文字列を渡す必要があり、指定した日付時点で選挙が行われた場合の結果を取得できます。 -->

参議院の各選挙区の定数などの情報を扱います。参議院の選挙区は概ね都道府県ベースですが、2015年に「合区」が導入されて以降は都道府県と一致しておらず、将来的にさらに合区が増える可能性があるため、`date` 引数に `'YYYY-MM-DD'` 形式の文字列を渡す必要があり、指定した日付時点で選挙が行われた場合の結果を取得できます。

```ts
getSanDistrictName('tottori-shimane', '2025-07-01') // '鳥取県・島根県'
getSanDistrictSeats('tokyo', '2025-07-01') // 6

// compareSanDistrictIds は sort の比較関数として使用
['okinawa', 'hokkaido', 'tokyo'].sort(compareSanDistrictIds('2025-07-01')) // ['hokkaido', 'tokyo', 'okinawa']
```

* `sanDistricts2015`: 2015年に施行された改正公職選挙法による選挙区の一覧
* 型 `SanDistrictId2015`: 当ライブラリが定めた選挙区の ID (基本的に上述の都道府県 ID であり、合区の場合は日本産業規格で定められた順でハイフンで繋げたもの)

### 全国地方公共団体コード

総務省が定めている「[全国地方公共団体コード](https://www.soumu.go.jp/denshijiti/code.html)」のための機能群です。JIS X 0401 で定められている2桁の都道府県コード、JIS X 0402 で定められている3桁の市区町村コードと、検査数字1桁から成ります。

#### 利用データ

- 2024年 (令和6年) 1月1日更新 (000925835)

これ以前のデータには現時点で対応していません。

### 地域メッシュコード

JIS X 0410 で定められている「地域メッシュコード」のための機能群です。業界でみられる様々な非標準拡張にも対応しています。

#### `coordinateToMeshCode(coordinate, resolution): string`

座標をメッシュコードに変換します。

第1引数には座標を [緯度, 経度] もしくは [経度, 緯度] の形式で与えます。

座標の緯度経度をどの順番で指定するかは大きなサービス間でもはっきりと統一されていません。ISO 6709 では [緯度, 経度] の順と定義されており、Google Maps や JIS X 0410 など、この順番を遵守しているものがやや多い印象ですが、たとえば GeoJSON ([RFC 7841](https://datatracker.ietf.org/doc/html/rfc7946)) では [経度, 緯度] の順で座標を記述します。「地域メッシュコード」は日本国土のみ (北緯24 - 46度、東経122 - 149度範囲) を対象としているため、幸い順番の推測が可能ですから、このライブラリは両方の順番に対応しています。

第2引数には所望のメッシュ種類を指定します。

| 引数 | JIS X 0410 での定義 | 1辺のおおよその距離 | よく使われている名称 | 使用されている箇所の例 |
| --- | --- | --- | --- | --- |
| `JIS-1`, `1`, `80km` | 「基準地域メッシュコード」のはじめ4桁の「第1次地域区画を示す数字」 | 80 km | 1次メッシュコード | 国勢調査 |
| `JIS-2`, `JIS-3-x10`, `2`, `10km` | 「基準地域メッシュコード」のはじめ6桁の「第2次地域区画を示す数字」、あるいは「統合地域メッシュコード」の「10倍地域メッシュコード」 | 10 km | 2次メッシュコード | 国勢調査 |
| `JIS-3-x5`, `5km` | 「統合地域メッシュコード」の「5倍地域メッシュコード」 | 5 km | | |
| `JIS-3-x2`, `2km` | 「統合地域メッシュコード」の「2倍地域メッシュコード」 | 2 km | | |
| `JIS-3`, `3`, `1km` | 「基準地域メッシュコード」 (「第3次地域区画を示す数字」) | 1 km | 3次メッシュコード | 国勢調査 |
| `JIS-3-1/2`, `4`, `500m` | 「分割地域メッシュコード」の「2分の1地域メッシュコード」 | 500 m | 4次メッシュコード | 国勢調査 |
| `JIS-3-1/4`, `5`, `250m` | 「分割地域メッシュコード」の「4分の1地域メッシュコード」 | 250 m | 5次メッシュコード | 国勢調査 |
| `JIS-3-1/8`, `125m` | 「分割地域メッシュコード」の「8分の1地域メッシュコード」 | 125 m | | |
| `100m` | なし | 100 m | | [国土数値情報「土地利用細分メッシュデータ」](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-L03-b.html) |
