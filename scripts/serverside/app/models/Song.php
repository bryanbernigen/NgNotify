<?php

class Song
{
    private $table = 'songs';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        require_once __DIR__ . '/../models/Album.php';
        $this->db = new Database;
    }

    public function addSong($judul, $penyanyi, $tanggal_terbit, $genre, $duration, $audio_path, $image_path, $album_id)
    {
        $this->db->startTransaction();
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
            $album = new Album();
            $res = $album->editAlbumTime($album_id, $duration);
            if($res){
                $this->db->commit();
                return true;
            }else{
                $this->db->rollback();
                return false;
            }
        } catch (PDOException $e) {
            $this->db->rollback();
            return  false;
        }
    }

    public function editSong($song_id, $judul, $penyanyi, $tanggal_terbit, $genre, $duration, $audio_path, $image_path, $album_id)
    {
        $this->db->startTransaction();
        $old_duration = $this->getSong($song_id)['duration'];
        $new_duration = $old_duration - $duration;
        $this->db->query('UPDATE ' . $this->table . ' SET judul = :judul, penyanyi = :penyanyi, tanggal_terbit = :tanggal_terbit, genre = :genre, duration = :duration, audio_path = :audio_path, image_path = :image_path, album_id = :album_id WHERE song_id = :song_id');
        $this->db->bind(':song_id', $song_id);
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
            $album = new Album();
            $res = $album->editAlbumTime($album_id, $new_duration);
            if($res){
                $this->db->commit();
                return true;
            }else{
                $this->db->rollback();
                return false;
            }
        } catch (PDOException $e) {
            $this->db->rollback();
            return  false;
        }
    }

    public function deleteSong($songId)
    {
        $this->db->startTransaction();
        $song = $this->getSong($songId);
        if(!$song){
            return false;
        }
        $album_id = $song['album_id'];
        $duration = $song['duration'];
        $this->db->query('DELETE FROM ' . $this->table . ' WHERE song_id = :songId');
        $this->db->bind(':songId', $songId);
        try {
            $this->db->execute();
            $album = new Album();
            $res = $album->editAlbumTime($album_id, -$duration);
            if($res){
                $this->db->commit();
                return true;
            }else{
                $this->db->rollback();
                return false;
            }
        } catch (PDOException $e) {
            $this->db->rollback();
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

    public function showAllSongs(){
        $this->db->query('SELECT * FROM ' . $this->table);
        try {
            $this->db->execute();
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function show10Songs()
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' ORDER BY judul LIMIT 10');
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
        $likeQuery = '%' . $query . '%';
        $filterGenre = '%' . $filterGenre . '%';
        if(isset($query)){
            if(is_numeric($query)){
                if(isset($filterGenre)){
                    if(isset($orderByYear)){
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE (EXTRACT(YEAR FROM tanggal_terbit) = :query AND genre like :filterGenre) ORDER BY tanggal_terbit ' . $orderByYear);
                        $this->db->bind(':query', $query);
                        $this->db->bind(':filterGenre', $filterGenre);
                    }
                    else{
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE (EXTRACT(YEAR FROM tanggal_terbit) = :query AND genre like :filterGenre) ORDER BY judul ' . $orderByJudul);
                        $this->db->bind(':query', $query);
                        $this->db->bind(':filterGenre', $filterGenre);
                    }
                }
                else{
                    if(isset($orderByYear)){
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE EXTRACT(YEAR FROM tanggal_terbit) = :query ORDER BY tanggal_terbit ' . $orderByYear);
                        $this->db->bind(':query', $query);
                    }
                    else{
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE EXTRACT(YEAR FROM tanggal_terbit) = :query ORDER BY judul ' . $orderByJudul);
                        $this->db->bind(':query', $query);
                    }
                }
            }
            else{
                if(isset($filterGenre)){
                    if(isset($orderByYear)){
                    $this->db->query("SELECT * FROM " . $this->table . " WHERE (judul LIKE :likeQuery OR penyanyi LIKE :likeQuery) AND genre LIKE :filterGenre ORDER BY tanggal_terbit " . $orderByYear);
                    $this->db->bind(':likeQuery', $likeQuery);
                    $this->db->bind(':filterGenre', $filterGenre);
                    }
                    else{
                        $this->db->query("SELECT * FROM " . $this->table . " WHERE (judul LIKE :likeQuery OR penyanyi LIKE :likeQuery) AND genre LIKE :filterGenre ORDER BY judul " . $orderByJudul);
                        $this->db->bind(':likeQuery', $likeQuery);
                        $this->db->bind(':filterGenre', $filterGenre);
                    }
                }
                else{
                    if(isset($orderByYear)){
                        $this->db->query("SELECT * FROM " . $this->table . " WHERE (judul LIKE :likeQuery OR penyanyi LIKE :likeQuery) ORDER BY tanggal_terbit " . $orderByYear);
                        $this->db->bind(':likeQuery', $likeQuery);
                    }
                    else{
                        $this->db->query("SELECT * FROM " . $this->table . " WHERE (judul LIKE :likeQuery OR penyanyi LIKE :likeQuery) ORDER BY judul " . $orderByJudul);
                        $this->db->bind(':likeQuery', $likeQuery);
                    }
                }
            }
        }
        else{
            if(isset($filterGenre)){
                if(isset($orderByYear)){
                    $this->db->query('SELECT * FROM ' . $this->table . ' WHERE genre LIKE :filterGenre ORDER BY tanggal_terbit ' . $orderByYear);
                    $this->db->bind(':filterGenre', $filterGenre);
                }
                else{
                    $this->db->query('SELECT * FROM ' . $this->table . ' WHERE genre LIKE :filterGenre ORDER BY judul ' . $orderByJudul);
                    $this->db->bind(':filterGenre', $filterGenre);
                }
            }
            else{
                if(isset($orderByYear)){
                    $this->db->query('SELECT * FROM ' . $this->table . ' ORDER BY tanggal_terbit ' . $orderByYear);
                }
                else{
                    $this->db->query('SELECT * FROM ' . $this->table . ' ORDER BY judul ' . $orderByJudul);
                }
            }
        }
        try {
            $this->db->execute();
            return $this->db->resultSet();
        } catch (PDOException $e) {
            return  false;
        }
    }
}
