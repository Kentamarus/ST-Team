<?php

require("classes/message.php");

try {        
        $email = new message();                
                
        $email->to = "bear-wolf@ukr.net";
        $email->from = "Новая заявка с сайта 'ST-Team'";
        $email->name = trim($_POST["fullName"]);
        $email->phone = trim($_POST["phone"]);
    
        $email->nisha = trim($_POST['nisha']);
        $email->site = trim($_POST['site']);
        $email->howYears = trim($_POST['howYears']);
        $email->district = trim($_POST['district']);
    
        $email->theme = "Content-type: text/plain; charset=\"utf-8\"\n From: $email->from";
    
        if ($email->send()>0)
        {
            echo "Сообщение отправилось успешно";            
        }
    
}
catch (Exception $e)
{
    echo "Exception=".$e;
}
?>
