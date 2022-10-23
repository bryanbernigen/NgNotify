<?php

class Register extends Controller {

    public function register(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['username']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $res = $this->model('User')->register($_POST['email'], $_POST['username'], $_POST['password']);
            if ($res) {
                json_response_success("success");
                return;
            } else {
                json_response_fail(EMAIL_REGISTERED);
                return;
            }
        }
        else{
            echo json_encode(Array('status' => false, 'message' => METHOD_NOT_ALLOWED));
        }
    }

    public function checkEmail($email){
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (!(isset($_GET['email']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $res = $this->model('User')->checkUnique('email',$_GET['email']);
            if ($res) {
                json_response_success("success");
                return;
            } else {
                json_response_fail(EMAIL_REGISTERED);
                return;
            }
        }
        else{
            echo json_encode(Array('status' => false, 'message' => METHOD_NOT_ALLOWED));
        }
    }

    public function checkUsername($username){
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (!(isset($_GET['username']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $res = $this->model('User')->checkUnique('username',$_GET['username']);
            if ($res) {
                json_response_success("success");
                return;
            } else {
                json_response_fail(USERNAME_REGISTERED);
                return;
            }
        }
        else{
            echo json_encode(Array('status' => false, 'message' => METHOD_NOT_ALLOWED));
        }
    }
}