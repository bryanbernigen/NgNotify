<?php

class Song
{
    private $table = 'songs';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database;
    }

    public function addSong($judul, $penyanyi, $tanggal_terbit, $genre, $duration, $audio_path, $image_path, $album_id)
    {
        $this->db->query('INSERT INTO ' . $this->table . ' VALUES (default, :judul, :penyanyi, :tanggal_terbit, :genre, :duration, :audio_path, :image_path, :album_id)');
        $this->db->bind(':judul', $judul);
        $this->db->bind(':penyanyi', $penyanyi);
        $this->db->bind(':tanggal_terbit', $tanggal_terbit);
        $this->db->bind(':genre', $genre);
        $this->db->bind(':duration', $duration);
        $this->db->bind(':audio_path', $audio_path);
        $this->db->bind(':image_path', $image_path);
        $this->db->bind(':album_id', $album_id);
        try {
            $this->db->execute();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function editSong($songId, $columnName, $value)
    {
        $this->db->query('UPDATE ' . $this->table . ' SET :column = :value WHERE song_id = :songId');
        $this->db->bind(':column', $columnName);
        $this->db->bind(':value', $value);
        $this->db->bind(':songId', $songId);
        try {
            $this->db->execute();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function deleteSong($songId)
    {
        $this->db->query('DELETE FROM ' . $this->table . ' WHERE song_id = :songId');
        $this->db->bind(':songId', $songId);
        try {
            $this->db->execute();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getSong($songId)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE song_id = :songId');
        $this->db->bind(':songId', $songId);
        try {
            $this->db->execute();
            return $this->db->single();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function show10Songs()
    {
        $this->db->query('SELECT * FROM' . $this->table . 'ORDER BY judul LIMIT 10');
        try {
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function sortSong($ascending)
    {
        if ($ascending) {
            $this->db->query('SELECT * FROM ' . $this->table . "ORDER BY DATE_PART('YEAR',tanggal_terbit) ASC");
        } else {
            $this->db->query('SELECT * FROM ' . $this->table . "ORDER BY DATE_PART('YEAR',tanggal_terbit) DESC");
        }
        try {
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function filterSong($genre)
    {
        $this->db->query('SELECT * FROM ' . $this->table . "WHERE genre LIKE '%:genre%'");
        $this->db->bind(':genre', $genre);
        try {
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }
    }
}
