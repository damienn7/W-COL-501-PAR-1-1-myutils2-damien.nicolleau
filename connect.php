<?php


try {
    $user = "damien";
    $pass = "PETITnuage-26";
    $db = new PDO('mysql:host=localhost;dbname=todolist', $user, $pass);
} catch (\Exception $e) {
    die("Erreur : ".$e->getMessage());
}