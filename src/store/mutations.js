export default {
    /**
     * Отображает анимацию загрузки при аяксах
     * @param state
     */
    showAjaxLoader(state) {
        state.ajaxLoading = true
    },
    /**
     * Скрывает анимацию загрузки при аяксах
     * @param state
     */
    hideAjaxLoader(state) {
        state.ajaxLoading = false
    },

    /**
     * Всплвающие сообщения
     * @param state
     * @param items
     */
    setToastMessages(state, items) {
        state.toastMessages = items
    },

    setCurrency(state, item) {
        state.currencySelected = item
    },

    setCompanyFilter(state, item) {
        state.companyFilter = item
    },

    setYearSelected(state, item) {
        state.yearSelected = item
    },

    setSpreadSelected(state, item) {
        state.spreadSelected = item
    },

    setDataOpened(state, item) {
        state.dataOpened = item
    },

    setDataSort(state, field) {
        state.dataFilter[field] = !state.dataFilter[field]
    },

};
