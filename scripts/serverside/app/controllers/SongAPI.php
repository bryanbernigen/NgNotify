<?php

class SongAPI extends Controller
{
    public function addSong()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $penyanyi = NULL;
        $genre = NULL;
        $image_path = NULL;
        $lyric = NULL;
        if (isset($_POST['penyanyi'])) {
            $penyanyi = $_POST['penyanyi'];
        }
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        if (isset($_POST['image_path'])) {
            $image_path = $_POST['image_path'];
        }
        if (isset($_POST['lyric'])) {
            $lyric = serialize($_POST['lyric']);
        }   
        if (isset($_POST['judul']) && isset($_POST['tanggal_terbit']) && isset($_POST['duration']) && isset($_POST['audio_path']) && isset($_POST['album_id'])) {
            $result = $this->model('Song')->addSong($_POST['judul'], $penyanyi, $_POST['tanggal_terbit'], $genre, $_POST['duration'], $_POST['audio_path'], $image_path, $_POST['album_id'],$lyric);
            if ($result) {
                json_response_success($result);
                return;
            } else {
                json_response_fail($result);
                return;
            }
        } else {
            json_response_fail(INVALID_PARAMETER);
            return;
        }
    }

    public function editSong()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $penyanyi = NULL;
        $genre = NULL;
        $image_path = NULL;
        $lyric = NULL;
        if (isset($_POST['penyanyi'])) {
            $penyanyi = $_POST['penyanyi'];
        }
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        if (isset($_POST['image_path'])) {
            $image_path = $_POST['image_path'];
        }
        if (isset($_POST['lyric'])) {
            $lyric = serialize($_POST['lyric']);
        }
        if (isset($_POST['song_id']) && isset($_POST['judul']) && isset($_POST['tanggal_terbit']) && isset($_POST['duration']) && isset($_POST['audio_path']) && isset($_POST['album_id'])) {
            $result = $this->model('Song')->editSong($_POST['song_id'], $_POST['judul'], $penyanyi, $_POST['tanggal_terbit'], $genre, $_POST['duration'], $_POST['audio_path'], $image_path, $_POST['album_id'],$lyric);
            if ($result) {
                json_response_success($result);
                return;
            } else {
                json_response_fail($result);
                return;
            }
        }
    }

    public function deleteSong()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Song')->getSong($_POST['song_id']);
        if (!$res) {
            return json_response_fail(SONG_NOT_FOUND);
        }
        $result = $this->model('Song')->deleteSong($_POST['song_id']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function showAllSongs()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Song')->showAllSongs();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail(SONG_NOT_FOUND);
        }
    }

    public function show10Songs()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Song')->show10Songs();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail(SONG_NOT_FOUND);
        }
    }

    public function getSong()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Song')->getSong($_GET['song_id']);
        if ($res) {
            $res['lyric'] = unserialize($res['lyric']);
            json_response_success($res);
        } else {
            json_response_fail(SONG_NOT_FOUND);
        }
    }

    public function getSongsFromAlbum(){
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        if(isset($_GET['album_id'])){
            $res = $this->model('Song')->getSongsFromAlbum($_GET['album_id']);
            if($res){
                json_response_success($res);
                return;
            }
            else{
                json_response_fail(SONG_NOT_FOUND);
                return;
            }
        }
        else{
            json_response_fail(WRONG_API_CALL);
        }
    }

    public function selectSong($page = 1, $limit_page = 10)
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $query = NULL;
        $order_by_year = NULL;
        $filter_genre = NULL;
        $order_by_title = 'ASC';
        $page = (int) $page - 1;
        if (isset($_POST['order_by_year'])) {
            $order_by_year = $_POST['order_by_year'];
        }
        if (isset($_POST['filter_genre'])) {
            $filter_genre = $_POST['filter_genre'];
        }
        if (isset($_POST['query'])) {
            $query = $_POST['query'];
        }
        if (isset($_POST['order_by_title'])) {
            $order_by_title = $_POST['order_by_title'];
        }
        $res = $this->model('Song')->selectSong($query, $order_by_year, $order_by_title, $filter_genre);
        $total = count($res);
        $res = array_slice($res, $page * $limit_page, $limit_page);
        if ($res) {
            json_response_success(array("songs"=>$res, "pages"=>ceil($total/$limit_page)));
        } else {
            json_response_fail(SONG_NOT_FOUND);
        }
    }
}
