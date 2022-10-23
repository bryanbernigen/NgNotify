<?php

class User
{
    private $table = 'users';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database;
    }

    public function login($email, $password)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE email = :email');
        $this->db->bind(':email', $email);
        $this->db->execute();
        $row = $this->db->single();
        if (password_verify($password, $row['password'])) {
            return $row;
        } else {
            return false;
        }
    }

    public function register($email, $password, $username)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE email = :email');
        $this->db->bind(':email', $email);
        $this->db->execute();
        $row = $this->db->single();
        if ($row) {
            return false;
        } else {
            $this->db->query('INSERT INTO ' . $this->table . ' VALUES (default, :email, :password, :username, true)');
            $this->db->bind(':email', $email);
            $this->db->bind(':username', $username);
            $this->db->bind(':password', password_hash($password, PASSWORD_DEFAULT));
            $this->db->execute();
            return true;
        }
    }

    public function changePassword($email, $password)
    {
        $this->db->query('UPDATE ' . $this->table . ' SET password = :password WHERE email = :email');
        $this->db->bind(':email', $email);
        $password = crypt($password, 'tubes1wbd');
        $this->db->bind(':password', $password);
        $this->db->execute();
        return true;
    }
}
