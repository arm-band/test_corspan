<?php

namespace Corspan\Controller;

class CSCors
{
    protected $config;

    public function __construct()
    {
        $this->config = require(__DIR__ . '/config.php');
    }
    public function setHeaders($jsonArray)
    {
        $headers = [
            'HTTP/1.1 ' . $jsonArray['status'] . ' ' . $jsonArray['message'],
            'Content-Type: application/json; charset=utf-8',
        ];
        $origin = '';

        if(array_key_exists('Origin', getallheaders()) || array_key_exists('origin', getallheaders())) {
            // Cors の場合自動的にリクエストヘッダに `Origin` が追加される。それが getallheaders() で取得できるリクエストヘッダの中に存在する場合
            $requestOrigin = getallheaders()['Origin'];
            foreach($this->config['cors'] as $value) {
                // config の中にある cors の一覧と $requestOrigin を正規表現でチェック
                $regexStr = '/^' . $value . '$/i';
                if(preg_match($regexStr, $requestOrigin)) {
                    // マッチした場合 $origin に値を格納し、ループをブレーク
                    // $origin → レスポンスヘッダの Access-Control-Allow-Origin に記載する
                    $origin = $requestOrigin;
                    break;
                }
            }
        }
        if(mb_strlen($origin, 'UTF-8') > 0) {
            $headers = array_merge(
                $headers,
                [
                    'Access-Control-Allow-Origin: ' . $origin,
                    'Access-Control-Allow-Headers: GET, OPTIONS',
                ]
            );
        }

        return $headers;
    }
}
