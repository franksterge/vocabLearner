<?php
    error_reporting(E_ALL);
    function response($status, $status_message, $data) {
        if ($status < 400) {
            header("Content-type: application/json");
            $json_response = json_encode($data);
            echo $json_response;
        } else {
            header("HTTP/1.1 400 Invalid Request");
            die($status_message);
        }
    }
?>