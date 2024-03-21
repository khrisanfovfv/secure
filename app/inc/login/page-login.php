<?php
/*
Template Name: Мой шаблон страницы
*/

// Если пользователь зашел в систему то перекидываем его на главную страницу
if (is_user_logged_in()){
    header("Location: http://secure/information_system");
    die();
}
wp_head();
require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$emblem_ico = $resources->get_emblem_icon();
?>

<!-- html код шаблона -->
<div class="login">
    <div class="login__window">
        <img class="login__emblem" src="<?php echo $emblem_ico ?>" alt="Эмблема">
        <div class="login__fields">
            <input id="login__username" placeholder="Имя пользователя">
            <input type="password" id="login__password" placeholder="Пароль">
            <div class="check-div" id="login__remember">
                <input type="checkbox" class="check-box" id="login__remember_check">
                <span class="check-style" id="login__remember_span"></span>
                <label class="check-title" for="login__remember_check" id="login__remember_title">Запомнить меня</label>
            </div>
            <button id="login__submit">Вход</button>
        </div> 
    </div>
</div>

<?php wp_footer();?>
