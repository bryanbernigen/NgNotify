<?php

class Test extends Controller
{
    public function checkUniqueEmail()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            json_response_fail(METHOD_NOT_ALLOWED);
            return;
        }
        if (isset($_GET['email'])) {
            $result = $this->model('User')->checkUniqueEmail($_GET['email']);
            if ($result) {
                json_response_success($result);
                return;
            } else {
                json_response_fail($result);
                return;
            }
        }
    }

    public function checkUniqueUsername()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            json_response_fail(METHOD_NOT_ALLOWED);
            return;
        }
        if (isset($_GET['username'])) {
            $result = $this->model('User')->checkUniqueUsername($_GET['username']);
            if ($result) {
                json_response_success($result);
                return;
            } else {
                json_response_fail($result);
                return;
            }
        }
    }

    public function showAllUser()
    {
        $res = $this->model('User')->showAllUser();
        if($res){
            json_response_success($res);
        }
        else{
            json_response_fail("error");
        }
        return;
    }

    //cara bikin null yang beneran null di db harus kaya gitu
    public function addSong()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $penyanyi = NULL;
        $genre = NULL;
        $image_path = NULL;
        if (isset($_POST['penyanyi'])) {
            $penyanyi = $_POST['penyanyi'];
        }
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        if (isset($_POST['image_path'])) {
            $image_path = $_POST['image_path'];
        }
        if (isset($_POST['judul']) && isset($_POST['tanggal_terbit']) && isset($_POST['duration']) && isset($_POST['audio_path']) && isset($_POST['album_id'])) {
            $result = $this->model('Song')->addSong($_POST['judul'], $penyanyi, $_POST['tanggal_terbit'], $genre, $_POST['duration'], $_POST['audio_path'], $image_path, $_POST['album_id']);
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
        if (isset($_POST['penyanyi'])) {
            $penyanyi = $_POST['penyanyi'];
        }
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        if (isset($_POST['image_path'])) {
            $image_path = $_POST['image_path'];
        }
        if (isset($_POST['song_id']) && isset($_POST['judul']) && isset($_POST['tanggal_terbit']) && isset($_POST['duration']) && isset($_POST['audio_path']) && isset($_POST['album_id'])) {
            $result = $this->model('Song')->editSong($_POST['song_id'], $_POST['judul'], $penyanyi, $_POST['tanggal_terbit'], $genre, $_POST['duration'], $_POST['audio_path'], $image_path, $_POST['album_id']);
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
        if(!$res){
            return json_response_fail('SONG_NOT_FOUND');
        }
        $result = $this->model('Song')->deleteSong($_POST['song_id']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function show10Songs()
    {
        if($_SERVER['REQUEST_METHOD'] != 'GET'){
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Song')->show10Songs();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('SONG_NOT_FOUND');
        }
    }

    public function getSong()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Song')->getSong($_GET['song_id']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('SONG_NOT_FOUND');
        }
    }

    public function selectSong()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $query = NULL;
        $order_by_year = NULL;
        $filter_genre = NULL;
        $order_by_title = 'ASC';
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
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail(SONG_NOT_FOUND);
        }
    }

    public function addAlbum()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $genre = NULL;
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        $result = $this->model('Album')->addAlbum($_POST['judul'], $_POST['penyanyi'], $_POST['total_duration'], $_POST['image_path'], $_POST['tanggal_terbit'], $genre);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function editAlbum()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $genre = NULL;
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        $result = $this->model('Album')->editAlbum($_POST['album_id'], $_POST['judul'], $_POST['penyanyi'], $_POST['total_duration'], $_POST['image_path'], $_POST['tanggal_terbit'], $genre);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function deleteAlbum(){
        if($_SERVER['REQUEST_METHOD'] != 'POST'){
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Album')->getAlbum($_POST['album_id']);
        if(!$res){
            return json_response_fail('ALBUM_NOT_FOUND');
        }
        $result = $this->model('Album')->deleteAlbum($_POST['album_id']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function getAlbum()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Album')->getAlbum($_GET['album_id']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('ALBUM_NOT_FOUND');
        }
    }

    public function showAllAlbum()
    {
        $res = $this->model('Album')->showAllAlbum();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail('ALBUM_NOT_FOUND');
        }
    }
}
