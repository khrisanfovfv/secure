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
        <li class="context-menu__item" id="organization_ref__context_copy">
            <img src="<?php echo $button_icons->profile ?>" alt="Профиль">
            <p>Профиль</p>
        </li>
        <li class="context-menu__item" id="organization_ref__context_delete">
            <img src="<?php echo  $button_icons->exit ?>" alt="Выход">
            <p>Выход</p>
        </li>
    </ul>
</div>
    <?php wp_footer() ?>
</html>