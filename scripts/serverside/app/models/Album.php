<?php

class Album
{
    private $table = 'albums';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database;
    }

    public function addAlbum($judul, $penyanyi, $total_duration, $image_path, $tanggal_terbit, $genre)
    {
        $this->db->query('INSERT INTO ' . $this->table . ' VALUES (default, :judul, :penyanyi, :total_duration, :image_path, :tanggal_terbit, :genre)');
        $this->db->bind(':judul', $judul);
        $this->db->bind(':penyanyi', $penyanyi);
        $this->db->bind(':total_duration', $total_duration);
        $this->db->bind(':image_path', $image_path);
        $this->db->bind(':tanggal_terbit', $tanggal_terbit);
        $this->db->bind(':genre', $genre);
        try {
            $this->db->execute();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function deleteAlbum($albumId){
        $this->db->query('DELETE FROM ' . $this->table . ' WHERE album_id = :albumId');
        $this->db->bind(':AlbumId', $albumId);
        try {
            $this->db->execute();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function getAlbum($albumId){
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE album_id = :albumId');
        $this->db->bind(':albumId', $albumId);
        try {
            $this->db->execute();
            return $this->db->single();
        } catch (PDOException $e) {
            return  false;
        }   
    }

    public function showAllAlbum(){
        $this->db->query('SELECT * FROM ' . $this->table . ' ORDER BY judul ASC');
        try {
            $this->db->execute();
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }   
    }

}
