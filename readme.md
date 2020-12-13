# Corspan

## Abstract

開発環境のBrowserSyncから外部サーバにデータを取得しに行くとCorsで引っかかるのを抑制するサンプル。

## Usage

1. `git clone https://github.com/arm-band/test_corspan`
2. `yarn`
3. copy and rename below two files
    - `sample.env` -> `.env`
    - `src/php/src/config.php.sample` -> `src/php/src/config.php`
4. edit `.env` and `src/php/src/config.php`
    - `.env`: `URL`
    - `src/php/src/config.php`: `cors`
5. `gulp`
