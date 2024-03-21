<?php 
    /**
     * Footer template.
     * 
     * package Secure
     */

    require_once(wp_normalize_path(get_template_directory()) . '/common.php');
    $resources = new Resources();
    $button_icons = $resources->get_button_icons()
   
?>

    <footer class="footer">
        <p class="footer__text">&copy Наимова Д.А., 2023</p3>
    </footer>

    <!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ПОЛЬЗОВАТЕЛЯ -->
<div class="context-menu" id="user__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="user__context_profile">
            <img src="<?php echo $button_icons->profile ?>" alt="Профиль">
            <p>Профиль</p>
        </li>
        <li class="context-menu__item" id="user__context_exit">
            <img src="<?php echo  $button_icons->exit ?>" alt="Выход">
            <p>Выход</p>
        </li>
    </ul>
</div>

<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="footer_ref__dialog">
    <div class="appdialog__window" id="footer_ref__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="footer_ref__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="footer_ref__dialog_content"></div>
        </div>
    </div>
</div>
    <?php wp_footer() ?>
</html>