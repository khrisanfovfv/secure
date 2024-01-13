<div class="document_search__content">
    <div class="document_search__fields">
        <!-- номер -->
        <label for="document_search__number">Номер</label>
        <input type="text" id="document_search__number">
        <!-- Дата документа -->
        <label for="document_search__documentdate">Дата документа</label>
        <input type="date" id="document_search__documentdate">
        <!-- Наименование -->
        <label for="document_search__name">Наименование</label>
        <input type="text" id="document_search__name">
        <!-- Вид документа -->
        <label for="document_search__kind">Вид документа</label>
        <div class="card__record" id="document_search__kind">
            <p class='hide name_reference'>document_kind</p>
            <p class="id hide"></p>
            <input class='fullname' type="text">
            <div class="card_record__button" id="document_search__kind_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Тип -->
        <label for="document_search__type">Тип</label>
        <select id="document_search__type">
            <option value=""></option>
            <option value="Inbox">Входящий</option>
            <option value="Outbox">Исходящий</option>
        </select>  
        <!-- Отправитель -->
        <label for="document_search__sender">Отправитель</label>
        <div class="card__record" id="document_search__sender">
            <p class='hide name_reference'>organization</p>
            <p class="id hide"></p>
            <input class='fullname' type="text">
            <div class="card_record__button" id="document_search__sender_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Дата отправки/получения -->
        <label for="document_search__sendreceive">Дата отправки/получения</label>
        <input type="date" id="document_search__sendreceive">
        <!-- Подписант -->
        <label for="document_search__signer">Подписант</label>
        <input type="text" id="document_search__signer">
        <!-- Документ подписан -->
        <label for="document_search__signed">Подписан</label>
        <select id="document_search__signed">
            <option value=""></option>
            <option value="1">Да</option>
            <option value="0">Нет</option>
        </select>  
        <!-- Состояние -->
        <label for="document_search__state">Состояние</label>
        <select id="document_search__state">
            <option value=""></option>
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>  
    </div>
     <div class="finish_buttons">
        <button class="finish_button" id="document_search__button_OK">OK</button>
        <button class="finish_button" id="document_search__button_Cancel">Отмена</button>
    </div>
</div>

<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="document_search__dialog">
    <div class="appdialog__window" id="document_search__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="document_search__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#" id="document_search__dialog_header_close">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="document_search__dialog_content"></div>
        </div>
    </div>
</div>