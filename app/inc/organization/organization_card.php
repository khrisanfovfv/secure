<?php wp_head(); ?>
<div class="organization_card__content">
    <div class="organization_card__fields">
        <!-- ИД -->
        <p class="hide" id="organization_card__id"></p>
        <!-- Полное наименование-->
    <label id="organization_card__fullName_label" for="organization_card__fullName">Полн.
        наименование</label>
    <textarea name="organization_card__fullName" id="organization_card__fullName" cols="100"
        rows="3">Бюджетное учреждение в сфере инфорационных технологий Вологодской облапсти “Центр информационных технологий”</textarea>
    <label for="organization_card__briefName">Кратк. наименование</label>
    <input name="organization_card__briefName" id="organization_card__briefName" type="text">
    <label id="organization_card__inn_label" for="organization_card__inn">ИНН</label>
    <input name="organization_card__inn" id="organization_card__inn" type="text">
    <label id="organization_card__kpp_label" for="organization_card__kpp">КПП</label>
    <input name="organization_card__kpp" id="organization_card__kpp" type="text">
    <label id="organization_card__ogrn_label" for="organization_card__ogrn">ОГРН</label>
    <input name="organization_card__ogrn" id="organization_card__ogrn" type="text">
    <label id="organization_card__okpo_label" for="organization_card__okpo">ОКПО</label>
    <input name="organization_card__okpo" id="organization_card__okpo" type="text">
    <label for="organization_card__postAddress">Почтовый адрес</label>
    <textarea name="organization_card__postAddress" id="organization_card__postAddress" cols="30"
        rows="3">160000, Вологодская Область, г. Вологда, ул. Герцена, д.27</textarea>
    <label for="organization_card__postAddress">Юридический адрес</label>
    <textarea name="organization_card__postAddress" id="organization_card__legalAddress" cols="30"
        rows="3">160000, Вологодская Область, г. Вологда, ул. Герцена, д.27</textarea>
    <label for="organization_card__email">email</label>
    <input name="organization_card__email" id="organization_card__email" type="text">
    <label id="organization_card__state_label" for="organization_card__state">Состояние</label>
    <select name="organization_card__state" id="organization_card__state">
        <option value="Active">Действующая</option>
        <option value="Inactive">Не действующая</option>
    </select>
    </div>
    <div class="finish_buttons">
        <button class="finish_button" id="organization__card_OK">OK</button>
        <button class="finish_button" id="organization__card_Cancel">Cancel</button>
    </div> 
</div> <!-- /organization_card__content -->
<?php wp_footer() ?>