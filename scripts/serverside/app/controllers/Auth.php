<?php

class Auth extends Controller {

    public function login(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (isset($_SESSION["user"])){
                echo json_encode(Array('status' => false, 'message' => ALREADY_LOGIN));
                return;
            }
            if (!(isset($_POST['username']) && isset($_POST['password']))) {
                echo WRONG_API_CALL;
                return;
            }
            $res = $this->model('User')->login($_POST['username'], $_POST['password']);
            if ($res) {
                $data = array('status' => true, 'data' => array('username' => $res['username'], "user_id" => $res['user_id'], 'isAdmin' => $res['isAdmin']));
                $_SESSION["user"] = array('username' => $res['username'], "user_id" => $res['user_id'], 'isAdmin' => $res['isAdmin'], 'email' => $res['email']);
            } else {
                $data = array('status' => false, 'msg' => ACCOUNT_NOT_FOUND);
            }
            echo json_encode($data);
        }
        else{
            echo json_encode(Array('status' => false, 'message' => METHOD_NOT_ALLOWED));
        }
    }

    public function logout(){
        session_destroy();
        echo json_encode(Array('status' => true, 'message' => "success"));
    }

}