<?php

class Login extends Controller {

    public function login(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!(isset($_POST['username']) && isset($_POST['password']))) {
                echo WRONG_API_CALL;
                return;
            }
            $res = $this->model('User')->getLogin($_POST['username'], $_POST['password']);
            if ($res) {
                $data = array('status' => true, 'data' => array('username' => $res['username'], 'isAdmin' => $res['isAdmin']));
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