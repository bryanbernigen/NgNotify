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

    /*
    $orderByYear - NULL jika tidak terurut berdasarkan tahun, ASC/DESC jika terurut berdasarkan tahun
    $orderByJudul - ASC atau DESC tidak boleh NULL karena secara otomatis akan terutur berdasarkan judul jika tahun kosong
    */
    public function selectSong($query, $orderByYear, $orderByJudul, $filterGenre){
        //select * from songs where ((judul like '%zzz%' OR penyanyi like '%zzz%' 
        //OR DATE_PART('YEAR',tanggal_terbit) = 2000) AND genre like '%a%') 
        //ORDER BY DATE_PART('YEAR',tanggal_terbit) ASC
        if(isset($query)){
            if(isset($filterGenre)){
                if(isset($orderByYear)){
                    $this->db->query("SELECT * FROM " . $this->table . " WHERE ((judul LIKE '%:query%' OR penyanyi LIKE '%:query%' OR DATE_PART('YEAR',tanggal_terbit) = :query) AND genre LIKE '%:filterGenre%') ORDER BY DATE_PART('YEAR',tanggal_terbit) :orderByYear");
                    $this->db->bind(':query', $query);
                    $this->db->bind(':filterGenre', $filterGenre);
                    $this->db->bind(':orderByYear', $orderByYear);
                }
                else{
                    $this->db->query("SELECT * FROM " . $this->table . " WHERE ((judul LIKE '%:query%' OR penyanyi LIKE '%:query%' OR DATE_PART('YEAR',tanggal_terbit) = :query) AND genre LIKE '%:filterGenre%') ORDER BY judul :orderByJudul");
                    $this->db->bind(':query', $query);
                    $this->db->bind(':filterGenre', $filterGenre);
                    $this->db->bind(':orderByJudul', $orderByJudul);
                }
            }
            else{
                if(isset($orderByYear)){
                    $this->db->query("SELECT * FROM " . $this->table . " WHERE (judul LIKE '%:query%' OR penyanyi LIKE '%:query%' OR DATE_PART('YEAR',tanggal_terbit) = :query) ORDER BY DATE_PART('YEAR',tanggal_terbit) :orderByYear");
                    $this->db->bind(':query', $query);
                    $this->db->bind(':orderByYear', $orderByYear);
                }
                else{
                    $this->db->query("SELECT * FROM " . $this->table . " WHERE (judul LIKE '%:query%' OR penyanyi LIKE '%:query%' OR DATE_PART('YEAR',tanggal_terbit) = :query) ORDER BY judul :orderByJudul");
                    $this->db->bind(':query', $query);
                    $this->db->bind(':orderByJudul', $orderByJudul);
                }
            }
        }
        else{
            if(isset($filterGenre)){
                if(isset($orderByYear)){
                    $this->db->query("SELECT * FROM " . $this->table . " WHERE genre LIKE '%:filterGenre%' ORDER BY DATE_PART('YEAR',tanggal_terbit) :orderByYear");
                    $this->db->bind(':filterGenre', $filterGenre);
                    $this->db->bind(':orderByYear', $orderByYear);
                }
                else{
                    $this->db->query("SELECT * FROM " . $this->table . " WHERE genre LIKE '%:filterGenre%' ORDER BY judul :orderByJudul");
                    $this->db->bind(':filterGenre', $filterGenre);
                    $this->db->bind(':orderByJudul', $orderByJudul);
                }
            }
            else{
                if(isset($orderByYear)){
                    $this->db->query("SELECT * FROM " . $this->table . " ORDER BY DATE_PART('YEAR',tanggal_terbit) :orderByYear");
                    $this->db->bind(':orderByYear', $orderByYear);
                }
                else{
                    $this->db->query("SELECT * FROM " . $this->table . " ORDER BY judul :orderByJudul");
                    $this->db->bind(':orderByJudul', $orderByJudul);
                }
            }
        }
    }

    public function sortSong($ascending)
    {
        if ($ascending) {
            $this->db->query('SELECT * FROM ' . $this->table . " ORDER BY DATE_PART('YEAR',tanggal_terbit) ASC");
        } else {
            $this->db->query('SELECT * FROM ' . $this->table . " ORDER BY DATE_PART('YEAR',tanggal_terbit) DESC");
        }
        try {
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function filterSong($genre)
    {
        $this->db->query('SELECT * FROM ' . $this->table . " WHERE genre LIKE '%:genre%'");
        $this->db->bind(':genre', $genre);
        try {
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }
    }
}
