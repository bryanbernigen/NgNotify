<?php

class Auth extends Controller {

    public function login(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (isset($_SESSION["user"])){
                json_response_fail(ALREADY_LOGIN);
                return;
            }
            if (!(isset($_POST['email']) && isset($_POST['password']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $res = $this->model('User')->login($_POST['email'], $_POST['password']);
            if ($res) {
                $data = array('username' => $res['username'], "user_id" => $res['user_id'], 'isAdmin' => $res['isAdmin']);
                $_SESSION["user"] = array('username' => $res['username'], "user_id" => $res['user_id'], 'isAdmin' => $res['isAdmin'], 'email' => $res['email']);
                json_response_success($data);
            } else {
                json_response_fail(ACCOUNT_NOT_FOUND);
            }
            
            return;
        }
        else{
            json_response_fail(METHOD_NOT_ALLOWED);
            return;
        }
    }

    public function logout(){
        session_destroy();
        json_response_success("success");
    }

}