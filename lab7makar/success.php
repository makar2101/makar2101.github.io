<?php
header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);

$check = is_array($_POST['check']) ? $_POST['check'] : array();
$check = implode (', ', $check );

$radio = htmlspecialchars($_POST["radio"]);

$refferer = getenv('HTTP_REFERER'); //адреса, звідки була надіслана форма
$date=date("d.m.y"); // число.місяць.рік  
$time=date("H:i"); // години:хвилини:секунди 
$myemail = "makarjurtschuk@gmail.com"; // e-mail адміністратора, можна поставити кому і вказати інші адреси


// Надсилання листа адміністратору сайта

$tema = "Лист адміністратору";
$message_to_myemail = "Текст листа:
<br><br>
Ім'я: $name<br>
E-mail: $email<br>
Телефон: $tel<br>
Чек-бокс: $check<br>
Радіо: $radio<br>
Джерело (посилання): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: Sitename <makarjurtschuk@gmail.com> \r\n Reply-To: Sitename \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// Надсилання листа користувачу

$tema = "Тема листа клієнту";
$message_to_myemail = "
Текст листа<br>
Файл: <a href='http://адреса до файла/ripple.zip' download>Назва файла</a>

";
$myemail = $email;
mail($myemail, $tema, $message_to_myemail, "From: versite <makarjurtschuk@gmail.com> \r\n Reply-To: versite \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );



// Збереження інформації про ліди в файл leads.xls

$f = fopen("leads.xls", "a+");
fwrite($f," <tr>");    
fwrite($f," <td>$email</td> <td>$name</td> <td>$tel</td>   <td>$date / $time</td>");   
fwrite($f," <td>$refferer</td>");    
fwrite($f," </tr>");  
fwrite($f,"\n ");    
fclose($f);

?>