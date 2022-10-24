<?php

class Test extends Controller
{
    public function checkemail()
    {
        $result = $this->model('User')->checkUniqueEmail($_GET['email']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function checkusername()
    {
        $result = $this->model('User')->checkUniqueUsername($_GET['username']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function showAllUser()
    {
        $res = $this->model('User')->showAllUser();
        json_response_success($res);
    }

    //cara bikin null yang beneran null di db harus kaya gitu
    public function addSong()
    {
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
        $result = $this->model('Song')->addSong($_POST['judul'], $penyanyi, $_POST['tanggal_terbit'], $genre, $_POST['duration'], $_POST['audio_path'], $image_path, $_POST['album_id']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function editSong()
    {
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
        $result = $this->model('Song')->editSong($_POST['song_id'],$_POST['judul'], $penyanyi, $_POST['tanggal_terbit'], $genre, $_POST['duration'], $_POST['audio_path'], $image_path, $_POST['album_id']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function deleteSong(){
        $result = $this->model('Song')->deleteSong($_POST['song_id']);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function show10Songs()
    {
        $res = $this->model('Song')->show10Songs();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail($res);
        }
    }

    public function getsong()
    {
        $res = $this->model('Song')->getSong($_GET['song_id']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail($res);
        }
    }

    public function selectSong(){
        $query = NULL;
        $order_by_year = NULL;
        $filter_genre = NULL;
        $order_by_title = 'ASC';
        if(isset($_POST['order_by_year'])){
            $order_by_year = $_POST['order_by_year'];
        }
        if(isset($_POST['filter_genre'])){
            $filter_genre = $_POST['filter_genre'];
        }
        if(isset($_POST['query'])){
            $query = $_POST['query'];
        }
        if(isset($_POST['order_by_title'])){
            $order_by_title = $_POST['order_by_title'];
        }
        $res = $this->model('Song')->selectSong($query,$order_by_year,$order_by_title,$filter_genre);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail($res);
        }
    }

    public function addAlbum(){
        $genre = NULL;
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        $result = $this->model('Album')->addAlbum($_POST['judul'],$_POST['penyanyi'],$_POST['total_duration'],$_POST['image_path'],$_POST['tanggal_terbit'],$genre);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function editAlbum(){
        $genre = NULL;
        if (isset($_POST['genre'])) {
            $genre = $_POST['genre'];
        }
        $result = $this->model('Album')->editAlbum($_POST['album_id'],$_POST['judul'],$_POST['penyanyi'],$_POST['total_duration'],$_POST['image_path'],$_POST['tanggal_terbit'],$genre);
        if ($result) {
            echo json_response_success($result);
        } else {
            echo json_response_fail($result);
        }
    }

    public function getAlbum(){
        $res = $this->model('Album')->getAlbum($_POST['album_id']);
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail($res);
        }
    }

    public function showAllAlbum(){
        $res = $this->model('Album')->showAllAlbum();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail($res);
        }
    }
}
