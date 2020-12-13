<?php

namespace Corspan\Model;

class CSData
{
    protected $config;
    protected $Helpers;
    protected $jsonArray;

    public function __construct($Helpers)
    {
        $this->config = require(__DIR__ . '/config.php');
        $this->Helpers = $Helpers;
        $this->jsonArray = [];
    }

    public function get()
    {
        if(file_exists($this->config['dataPath'])) {
            $this->jsonArray = [
                'status'  => 200,
                'message' => 'OK.',
                'data'    => $this->Helpers->jsonFileRead($this->config['dataPath']),
            ];
        }
        else {
            $this->jsonArray = [
                'status'  => 404,
                'message' => 'Not found.',
                'data'    => [],
            ];
        }

        return $this->jsonArray;
    }
}
