<?php

require('connect.php');

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    
   $text=$_POST["table"];
    
    // foreach ($_POST["table"] as $key => $text) {
    try {
        $query = "insert into tasks(text) values(:text);";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":text",$text,\PDO::PARAM_STR_CHAR);
        $stmt->execute();
    } catch (\Exception $e) {
        die("Erreur : ".$e->getMessage());
    }
// }
}