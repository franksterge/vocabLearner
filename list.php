<?php
    include("common.php");
    if (isset($_GET['mode'])) {
        if (!in_array($_GET['mode'], ["record", "list"])) {
            response(400, "Error: Please provide a mode of record or list(s) of a vocab list",
                    NULL);
        }
        if (!isset($_GET['name'])) {
            response(400, "Error: Please add the name of the list when using list or record for mode", NULL);
        }
        
            // $result = glob("data/*.txt");
            // for ($i = 0; $i < count($result); $i++) {
            //     $result[$i] = substr(basename($result[$i]), 0, strlen(basename($result[$i])) - 4);
            // }
            // response(200, "Lists Rundown Found", $result);
    }
?>