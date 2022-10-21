<?php

class User {
    private $table = 'sql6527403.user';
    private $db;

    public function __construct() {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database;
    }

    public function getLogin($username, $password) {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE username = :username AND password = :password');
        $this->db->bind(':username', $username);
        $this->db->bind(':password', $password);
        $row = $this->db->single();
        if ($row) {
            return $row;
        } else {
            return false;
        }
    }
}