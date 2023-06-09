<?php

class Song
{
    private $table = 'songs';
    private $albumtable = 'albums';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        require_once __DIR__ . '/../models/Album.php';
        $this->db = new Database;
    }

    public function addSong($judul, $penyanyi, $tanggal_terbit, $genre, $duration, $audio_path, $image_path, $album_id, $lyric)
    {
        try {
            $this->db->startTransaction();
        }catch (\Throwable $th) {
            return false;
        }
        $this->db->query('INSERT INTO ' . $this->table . ' VALUES (default, :judul, :penyanyi, :tanggal_terbit, :genre, :duration, :audio_path, :image_path, :album_id, :lyric)');
        $this->db->bind(':judul', $judul);
        $this->db->bind(':penyanyi', $penyanyi);
        $this->db->bind(':tanggal_terbit', $tanggal_terbit);
        $this->db->bind(':genre', $genre);
        $this->db->bind(':duration', $duration);
        $this->db->bind(':audio_path', $audio_path);
        $this->db->bind(':image_path', $image_path);
        $this->db->bind(':album_id', $album_id);
        $this->db->bind(':lyric', $lyric);
        try {
            $res = $this->db->execute();
            if(!$res){
                $this->db->rollback();
                return false;
            }
            $this->db->query('UPDATE ' . $this->albumtable . ' SET total_duration = total_duration + :time WHERE album_id = :album_id');
            $this->db->bind(':album_id', $album_id);
            $this->db->bind(':time', $duration);
            $res = $this->db->execute();
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

    public function editSong($song_id, $judul, $penyanyi, $tanggal_terbit, $genre, $duration, $audio_path, $image_path, $album_id, $lyric)
    {
        $this->db->startTransaction();
        try {
            $old_song = $this->getSong($song_id);
            if(!$old_song){
                return false;
            }
            $old_duration = $old_song['duration'];
            $old_album_id = $old_song['album_id'];
        } catch (\Throwable $th) {
            $this->db->rollback();
            return false;
        }
        if(isset($lyric)){
            $this->db->query('UPDATE ' . $this->table . ' SET judul = :judul, penyanyi = :penyanyi, tanggal_terbit = :tanggal_terbit, genre = :genre, duration = :duration, audio_path = :audio_path, image_path = :image_path, album_id = :album_id, lyric = :lyric WHERE song_id = :song_id');
            $this->db->bind(':lyric', $lyric);
        }
        else{
            $this->db->query('UPDATE ' . $this->table . ' SET judul = :judul, penyanyi = :penyanyi, tanggal_terbit = :tanggal_terbit, genre = :genre, duration = :duration, audio_path = :audio_path, image_path = :image_path, album_id = :album_id WHERE song_id = :song_id');
        }
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
            $res = $this->db->execute();
            if(!$res){
                $this->db->rollback();
                return false;
            }
            $this->db->query('UPDATE ' . $this->albumtable . ' SET total_duration = total_duration - :time WHERE album_id = :album_id');
            $this->db->bind(':album_id', $old_album_id);
            $this->db->bind(':time', $old_duration);
            $res = $this->db->execute();
            if(!$res){
                $this->db->rollback();
                return false;
            }
            $this->db->query('UPDATE ' . $this->albumtable . ' SET total_duration = total_duration + :time WHERE album_id = :album_id');
            $this->db->bind(':album_id', $album_id);
            $this->db->bind(':time', $duration);
            $res = $this->db->execute();
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
            $res = $this->db->execute();
            if(!$res){
                $this->db->rollback();
                return false;
            }
            $this->db->query('UPDATE ' . $this->albumtable . ' SET total_duration = total_duration - :time WHERE album_id = :album_id');
            $this->db->bind(':album_id', $album_id);
            $this->db->bind(':time', $duration);
            $res = $this->db->execute();
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
            try {
                $resut = $this->db->single();   
                return $resut;
            } catch (\Throwable $th) {
                return false;
            }
        } catch (PDOException $e) {
            return  false;
        }
    }

    public function showAllSongs(){
        $this->db->query('SELECT * FROM ' . $this->table . ' ORDER BY song_id');
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

    public function getSongsFromAlbum($album_id){
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE album_id = :album_id');
        $this->db->bind(':album_id', $album_id);
        try {
            $result = $this->db->resultSet();
            if(!$result){
                return false;
            }
            return $result;
        } catch (PDOException $e) {
            return  false;
        }
    }

    /*
    $orderByYear - NULL jika tidak terurut berdasarkan tahun, ASC/DESC jika terurut berdasarkan tahun
    $orderByJudul - ASC atau DESC tidak boleh NULL karena secara otomatis akan terutur berdasarkan judul jika tahun kosong
    */
    public function querySong($query, $orderByYear, $orderByJudul, $filterByGenre){
        //select * from songs where ((judul like '%zzz%' OR penyanyi like '%zzz%' 
        //OR DATE_PART('YEAR',tanggal_terbit) = 2000) AND genre like '%a%') 
        //ORDER BY DATE_PART('YEAR',tanggal_terbit) ASC
        $likeQuery = '%' . $query . '%';
        $filterGenre = '%' . $filterByGenre . '%';
        if(isset($query)){
            if(is_numeric($query)){
                if(isset($filterByGenre)){
                    if(isset($orderByYear)){
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE ((judul LIKE :likeQuery OR penyanyi LIKE :likeQuery OR EXTRACT(YEAR FROM tanggal_terbit) = :query ) AND genre like :filterGenre) ORDER BY tanggal_terbit ' . $orderByYear);
                        $this->db->bind(':query', $query);
                        $this->db->bind(':likeQuery', $likeQuery);
                        $this->db->bind(':filterGenre', $filterGenre);
                    }
                    else{
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE ((judul LIKE :likeQuery OR penyanyi LIKE :likeQuery OR EXTRACT(YEAR FROM tanggal_terbit) = :query ) AND genre like :filterGenre) ORDER BY judul ' . $orderByJudul);
                        $this->db->bind(':query', $query);
                        $this->db->bind(':likeQuery', $likeQuery);
                        $this->db->bind(':filterGenre', $filterGenre);
                    }
                }
                else{
                    if(isset($orderByYear)){
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE (judul LIKE :likeQuery OR penyanyi LIKE :likeQuery OR EXTRACT(YEAR FROM tanggal_terbit) = :query ) ORDER BY tanggal_terbit ' . $orderByYear);
                        $this->db->bind(':query', $query);
                        $this->db->bind(':likeQuery', $likeQuery);
                    }
                    else{
                        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE (judul LIKE :likeQuery OR penyanyi LIKE :likeQuery OR EXTRACT(YEAR FROM tanggal_terbit) = :query ) ORDER BY judul ' . $orderByJudul);
                        $this->db->bind(':query', $query);
                        $this->db->bind(':likeQuery', $likeQuery);
                    }
                }
            }
            else{
                if(isset($filterByGenre)){
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
            if(isset($filterByGenre)){
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
