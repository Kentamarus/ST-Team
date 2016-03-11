<?php

class message{
    var $to;
    var $from;
    var $theme;
    
    var $name;
    var $email;
    var $phone;
    
    var $nisha;       
    var $site;       
    var $howYears;       
    var $district;       
    
        
    public function __constructor($to, $from, $name, $phone)
    {   
        echo "constructor=\n";
        echo "constructor=".$this->to."    'to'=".$to;
        $this->to = $to;                
        $this->theme = "Content-type: text/plain; charset=\"utf-8\"\n From: $from";
        $this->name = $name;
        $this->phone = $phone;
        
//        $this->nisha = trim($_POST['nisha']);
//        $this->site = trim($_POST['site']);
//        $this->howYears = trim($_POST['howYears']);
//        $this->district 
    }
    
    public function send()
    {        
        $message = "Имя: $this->name \nТелефон: $this->phone";
        
        if (empty($this->nisha)!=1)
        {
            $message = $message."\nНиша бизнеса: $this->nisha\nСайт: $this->site\nЛет в бизнесе : $this->howYears\nРегион для бизнеса : $this->district";
        }
            
        return mail($this->to, $this->from, $message, $this->theme);        
    }    
}
