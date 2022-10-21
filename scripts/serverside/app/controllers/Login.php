<?php

class Login extends Controller {

    public function login(){
        $res = $this->model('User')->getLogin($_POST['username'], $_POST['password']);
        if ($res) {
            $data = array('status' => true, 'data' => $res);
        } else {
            $data = array('status' => false);
        }
        echo json_encode($data);
    }
}