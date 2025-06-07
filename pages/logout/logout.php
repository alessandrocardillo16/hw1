<?php
    require_once(__DIR__ . '/../../dbconfig.php');

    session_start();
    session_destroy();

    header('Location: /hw1/pages/index/index.php');
?>