<?php
require_once 'api_keys.php';
$apiUrl = "https://ipgeolocation.abstractapi.com/v1/";
$clientIp = $_SERVER['REMOTE_ADDR'];

if ($clientIp === '127.0.0.1' || $clientIp === '::1') {
    $url = "$apiUrl?api_key=$apiKey";
} else {
    $url = "$apiUrl?api_key=$apiKey&ip_address=$clientIp";
}

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