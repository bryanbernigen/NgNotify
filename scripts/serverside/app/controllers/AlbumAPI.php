<?php

class AlbumAPI extends Controller
{
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

    public function deleteAlbum()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return json_response_fail(METHOD_NOT_ALLOWED);
        }
        $res = $this->model('Album')->getAlbum($_POST['album_id']);
        if (!$res) {
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
