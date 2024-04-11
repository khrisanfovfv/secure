<?php
/*
Template Name: Шаблон формы логина
*/

// Если пользователь зашел в систему то перекидываем его на главную страницу
if (is_user_logged_in()){
    header("Location: ". get_site_url(null, 'information_system', null));
    die();
}
wp_head();
// Выводим адрес эмблемы формы
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

<!-- ОКНО УВЕДОМЛЕНИЯ -->
<div class="appdialog" id="login_ref__notif">
    <div class="appdialog__window" id="login_ref__notif_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="login_ref__notif__header_title">Уведомление</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div class="appdialog__notif_content" id="login_ref__notif_content"></div>
            <div class="appdialog__finish_buttons">
                <button class="appdialog__notify_button">OK</button>
            </div>
        </div>
    </div>
</div>

<?php wp_footer();?>
