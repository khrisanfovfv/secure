<?php wp_head(); ?>
<div class="administrator_card__content">
    <div class="administrator_card__fields">
        <!-- ИД -->
        <p class="hide" id="administrator_card__id"></p>
        <!-- ФИО -->
        <label for="administrator_card__name">ФИО</label>
        <input type="text" name="administrator_card__fio" id="administrator_card__fio">
        <!-- Организация -->
        <label for="administrator_card__organisation">Организация</label>
        <div class="card__record">
            <p class="id hide">1</p>
            <input type="text" id="administrator_card__organisation1" name="administrator_card__organisation1">
            <div class="card_record__button" id="administrator_card__organisation_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Отдел -->
        <label for="administrator_card__department">Отдел</label>
        <div class="card__record">
            <p class="id hide">1</p>
            <input type="text" id="administrator_card__department" name="administrator_card__department">
            <div class="card_record__button" id="administrator_card__department_btn">&#183;&#183;&#183;</div>
        </div>
        <label for="administrator_card__state">Состояние</label>
        <select name="administrator_card__state" id="administrator_card__state">
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>
    </div>
    <div class="appdialog__finish_buttons">
        <button class="appdialog__finish_button" id="administrator__card_OK">OK</button>
        <button class="appdialog__finish_button" id="administrator__card_Cancel">Cancel</button>
    </div> 
</div> <!-- /administrator_card__content -->
<?php wp_footer() ?>