<?php

namespace Corspan\Helper;

class CSHelpers
{
    public function jsonFileRead($filepath) {
        return json_decode(mb_convert_encoding(file_get_contents($filepath), 'UTF-8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN'), true);
    }
    public function jsonOutput($array) {
        return json_encode($array, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    }
}
