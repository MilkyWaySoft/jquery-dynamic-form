<html>
    <body>
        <pre>
<?php
if(!empty($_POST)) {
    var_dump($_POST);
}

function formatForm($form, $level) {
    foreach ($form as $key => $value) {
       if($level == -1) {
           echo "\nForm $key\n";
       }
       if(is_array($value)) {
           if($level > -1) {
               echo str_repeat("\t", $level);
               echo "$key\n";
           }
           formatForm($value, $level+1);
       }else{
           if($level > -1){
               echo str_repeat("\t", $level);
           }
           echo "$key : $value\n";
       }
    }
}
formatForm($_POST, -1);

?>
        </pre>
    </body>
</html>
