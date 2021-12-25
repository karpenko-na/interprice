import _ from "lodash";

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

    setCurrencyList(state) {
        let list = []
        if (!_.isEmpty(state.data.Items)) {
            _.each(state.data.Items, (item) => {
                if (!_.isEmpty(item.Quote)) {
                    _.each(item.Quote, (quote) => {
                        if (!_.includes(list, quote.Currency)) list.push(quote.Currency)
                    })
                }
            })
        }
        state.currencyList=list
    },

    setYearList(state, currency) {
        let list = []
        if(_.isUndefined(currency)) currency = state.currencySelected

        if (!_.isEmpty(state.data.Items)) {
            _.each(state.data.Items, (item) => {
                if (!_.isEmpty(item.Quote)) {
                    _.each(item.Quote, (quote) => {
                        if (!_.includes(list, quote.Years) && quote.Currency===currency) list.push(quote.Years)
                    })
                }
            })
            list = _.sortBy(list)
        }
        let lists = _.assign({}, state.yearList)
        lists[currency] = list
        state.yearList = lists
    },

    setCurrency(state, item) {
        state.currencySelected = item
    },

    setYearSelected(state, {item, currency}) {
        if(_.isUndefined(currency)) currency = state.currencySelected
        let lists = _.assign({}, state.yearSelected)
        lists[currency] = item
        state.yearSelected = lists
    },

    setSpreadSelected(state, item) {
        state.spreadSelected = item
    },

    setCompanyFilter(state, item) {
        state.companyFilter = item
    },

    setDataOpened(state, item) {
        state.dataOpened = item
    },

    setDataSort(state, field) {
        state.dataSort[field] = !state.dataSort[field]
    },

};
