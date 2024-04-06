<?php
    require_once(wp_normalize_path(get_template_directory()) . '/common.php');
    $resources = new Resources();
    $avatar_ico = $resources->get_avatar_icon();
    $button_icons = $resources->get_button_icons();
?>

<div class="employee_card">
    <div class="employee_card__top">
        <div class = "employee_card__top_left">
            <img class ="employee_card__photo" src="<?php echo $avatar_ico ?>" alt="Фото">
        </div>
    
        <div class="employee_card__top_right">
            <!-- Логин -->
            <label for="employee_card__login">Логин:</label>
            <input id="employee_card__login">
            <!-- Фамилия -->
            <label for="employee_card__lastname">Фамилия:</label>
            <input id="employee_card__lastname">
            <!-- Имя -->
            <label for="employee_card__firstname">Имя:</label>
            <input id="employee_card__firstname">
            <!-- Отчество -->
            <label for="employee_card__firstname">Отчество:</label>
            <input id="employee_card__middlename">
            
        </div>
    </div>
    <div class="employee_card__bottom">
        <!-- Организация -->
        <label for="employee_card__organization">Организация</label>
            <div class="card__record" id="employee_card__organization">
                <p class='hide name_reference'>organization</p>
                <p class="id hide"></p>
                <input class="fullname" type="text">
                <div class="card_record__button" id="employee_card__organization_btn">&#183;&#183;&#183;</div>
            </div>
            <!-- Отдел -->
            <label for="employee_card__department">Отдел</label>
            <div class="card__record" id="employee_card__department">
                <p class='hide name_reference'>department</p>
                <p class="id hide"></p>
                <input class="fullname" type="text">
                <div class="card_record__button" id="employee_card__department_btn">&#183;&#183;&#183;</div>
            </div>
            
            <!-- email -->
            <label for="employee_card__email">email:</label>
            <input id="employee_card__email">
            <!-- Состояние -->
            <label for="employee_card__state" id="employee_card__state_label">Состояние:</label>
            <select id="employee_card__state" name="employee_card__state">
                <option value="Active">Действующая</option>
                <option value="Inactive">Не действующая</option>
            </select>
    </div>

    <div class="finish_buttons">
        <button class="finish_button" id="employee_card__OK">OK</button>
        <button class="finish_button" id="employee_card__Cancel">Отмена</button>
    </div>
</div>

<!-- Диалоговое окно -->
<div class="appdialog" id="employee_card__dialog">
    <div class="appdialog__window" id="employee_card__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="employee_card__dialog_title">Карточка</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="employee_card__dialog_content">
                <!-- P - Для диалогоых окон -->
                <p class="appdialog__content_text"></p>
            </div>
        </div>
    </div>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ АВАТАРА -->
<div class="context-menu" id="employee_card__photo_context">
<ul class="context-menu__list">
    <li class="context-menu__item" id="employee_ref__photo_context_change">
        <img src="<?php echo $button_icons->edit ?>">
        <p>Изменить</p>
    </li>
    <li class="context-menu__item" id="employee_ref__out_context_delete">
        <img src="<?php echo $button_icons->delete ?>">
        <p>Удалить</p>
    </li>
</ul>    
</div>