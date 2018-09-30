<?php
    include("common.php");
    $result = glob("data/*.txt");
    for ($i = 0; $i < count($result); $i++) {
        $result[$i] = substr(basename($result[$i]), 0, strlen(basename($result[$i])) - 4);
    }
    response(200, "Lists Rundown Found", $result);
?>