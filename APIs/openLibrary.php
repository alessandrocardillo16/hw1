<?php
$url = "https://openlibrary.org/search.json?author=Wizards+RPG+Team";


$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);

if (curl_errno($curl)) {
    echo json_encode(["error" => "Errore nella richiesta cURL: " . curl_error($curl)]);
} else {
    header('Content-Type: application/json');
    echo $response;
}

curl_close($curl);
?>