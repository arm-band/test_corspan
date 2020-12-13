<?php

namespace Corspan\Controller;

class CSOutputJson
{
    protected $CSHelpers;
    protected $CSCors;

    public function __construct($CSHelpers, $CSCors)
    {
        $this->CSHelpers = $CSHelpers;
        $this->CSCors = $CSCors;
    }

    public function output($jsonArray)
    {
        $headers = $this->CSCors->setHeaders($jsonArray);
        foreach($headers as $value) {
            header($value);
        }

        echo $this->CSHelpers->jsonOutput($jsonArray);
        exit();
    }
}