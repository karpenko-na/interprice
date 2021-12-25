import _ from 'lodash';

/**
 * Список валют
 * @param state
 * @returns {*[]}
 */
export const currencyList = state => {
    let list = []

    if(!_.isEmpty(state.data.Items)) {
        _.each(state.data.Items, (item) => {
            if (!_.isEmpty(item.Quote)) {
                _.each(item.Quote, (quote) => {
                    if (!_.includes(list, quote.Currency)) list.push(quote.Currency)
                })
            }
        })
    }
    return list
}

/**
 * Отсортированный список лет
 * @param state
 * @returns {*[]}
 */
export const yearList = state => {
    let list = []

    if(!_.isEmpty(state.data.Items)) {
        _.each(state.data.Items, (item) => {
            if (!_.isEmpty(item.Quote)) {
                _.each(item.Quote, (quote) => {
                    if (!_.includes(list, quote.Years)) list.push(quote.Years)
                })
            }
        })
        list = _.sortBy(list)
    }
    return list
}

/**
 * Данные отфильтрованные по валюте и годам, после чего отсортированные по "пустым значениям Quote", затем по "Дате" и по "Названию компании"
 * @param state
 * @returns {*[]}
 */
export const dataSortedAndFiltered = state => {
    let list = []

    if(!_.isEmpty(state.data.Items)) {
        // фильтруем
        _.each(state.data.Items, (item) => {
            if(_.isEmpty(state.companyFilter) || _.toUpper(item.Company).indexOf(_.toUpper(state.companyFilter))!==-1) {
                let itemTemp = _.assign({}, item)
                if (!_.isEmpty(itemTemp.Quote)) {
                    itemTemp.Quote = _.filter(itemTemp.Quote, (quote) => {
                        return quote.Currency === state.currencySelected && _.includes(state.yearSelected, quote.Years)
                    })
                }
                list.push(itemTemp)
            }
        })
        // сортируем
        list = _.orderBy(list, [function (item) {
            // по пустым Quote
            return _.isEmpty(item.Quote)
        }, 'DateSent', 'Company'], ['asc', state.dataSort.date ? 'asc' : 'desc', state.dataSort.company ? 'asc' : 'desc'])
    }
    return list
}

/**
 * Список непустых Quote, обогащенных Id, для подсчета минимального и среднего значения
 * @param state
 * @param getters
 * @returns {*[]}
 */
export const quoteList = (state, getters) => {
    let list = []

    if(!_.isEmpty(getters.dataSortedAndFiltered)) {
        _.each(getters.dataSortedAndFiltered, (item) => {
            if (!_.isEmpty(item.Quote)) {
                _.each(item.Quote, (quote) => {
                    let quoteTemp=_.assign({Id:item.Id}, quote)
                    list.push(quoteTemp)
                })
            }
        })
        list = _.sortBy(list)
    }
    return list
}