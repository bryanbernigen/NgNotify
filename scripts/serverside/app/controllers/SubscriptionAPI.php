<?php

class SubscriptionAPI extends Controller {

    public function newSubscription(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if(!isset($_POST['creator_id'])){
                json_response_fail(WRONG_API_CALL);
                return;
            }
            if(!isset($_POST['subscriber_id'])){
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $imagePath = null;
            if(isset($_POST['image_path'])){
                $imagePath = $_POST['image_path'];
            }
            $res = $this->model('Subscription')->newSubscription($_POST['creator_id'], $_POST['subscriber_id'], $imagePath);
            if($res){
                json_response_success('New subscription created');
            }
            else{
                json_response_fail('Failed to create new subscription');
            }
        }

        else{
            json_response_fail(METHOD_NOT_ALLOWED);
            return;
        }
    }

    public function updateSubscription(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!isset($_POST["creator_id"])){
                json_response_fail('WRONG_API_CALL');
                return;
            }
            if (!(isset($_POST['subscriber_id']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            if (!(isset($_POST['status']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $res = $this->model('Subscription')->updateSubscription($_POST['creator_id'], $_POST["subscriber_id"], $_POST['status']);
            if ($res) {
                json_response_success("success");
            }else{
                json_response_fail("failed");
            }
            return;
        }
        else{
            json_response_fail(METHOD_NOT_ALLOWED);
            return;
        }
    }
}