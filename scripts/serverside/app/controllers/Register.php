<?php

class Register extends Controller {

    public function register(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['username']))) {
                echo WRONG_API_CALL;
                return;
            }
            $res = $this->model('User')->register($_POST['email'], $_POST['username'], $_POST['password']);
            if ($res) {
                $data = array('status' => true);
            } else {
                $data = array('status' => false);
            }
            echo json_encode($data);
        }
        else{
            echo json_encode(Array('status' => false, 'message' => METHOD_NOT_ALLOWED));
        }
    }

}