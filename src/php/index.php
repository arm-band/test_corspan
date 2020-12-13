<?php

namespace Corspan;

date_default_timezone_set('Asia/Tokyo');
mb_language('ja');
mb_internal_encoding('UTF-8');

$config = require(__DIR__ . '/src/config.php');
require(__DIR__ . '/src/Helpers.php');
require(__DIR__ . '/src/ModelGet.php');
require(__DIR__ . '/src/ControllerCors.php');
require(__DIR__ . '/src/ControllerJson.php');

$CSHelpers    = new Helper\CSHelpers();
$CSData       = new Model\CSData($CSHelpers);
$CSCors       = new Controller\CSCors();
$CSOutputJson = new Controller\CSOutputJson($CSHelpers, $CSCors);

$jsonArray = $CSData->get();
$CSOutputJson->output($jsonArray);
