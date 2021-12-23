import _ from 'lodash';

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

export const dataSortedAndFiltered = state => {
    let list = []

    if(!_.isEmpty(state.data.Items)) {
        _.each(state.data.Items, (item) => {
            if(_.isEmpty(state.companyFilter) || _.toUpper(item.Company).indexOf(_.toUpper(state.companyFilter))!==-1) {
                let itemTemp = _.assign({}, item)
                if (!_.isEmpty(itemTemp.Quote)) {
                    itemTemp.Quote = _.filter(itemTemp.Quote, (quote) => {
                        return quote.Currency === state.currencySelected
                    })
                }
                list.push(itemTemp)
            }
        })
        //list = _.sortBy(list)
    }
    return list
}