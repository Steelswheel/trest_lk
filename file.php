<?php
require_once ($_SERVER["DOCUMENT_ROOT"].'/lk/backend/vendor/autoload.php');
define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");


if(!(isset($_GET['id']) && isset($_GET['file']))){
    exit();
}

if(!($file = \CFile::GetFileArray($_GET['id']))){
    exit();
}

$filePath = $_SERVER['DOCUMENT_ROOT'] . $file['SRC'];


if (file_exists($filePath)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.$file['ORIGINAL_NAME']);
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);
    exit;
}
