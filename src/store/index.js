import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        ajaxLoading: false,
        toastMessages: [], // 'success' | 'info' | 'error' | 'warning' | 'default'

        currencySelected: 'USD',
        companyFilter: '',
        yearSelected: [],
        spreadSelected: 'Spread',
        dataOpened: [],
        dataSort: {
            date: false,
            company: true,
        },

        data: {
            "Items": [
                {
                    "Id": "395356",
                    "DateSent": "2020-12-30",
                    "Company": "Openlane",
                    "Preferred": "1",
                    "Quote": [
                        {
                            "Amount": 500,
                            "Currency": "USD",
                            "Years": 5,
                            "CouponType": "FIX",
                            "Spread": 50,
                            "Yield": 0.873,
                            "3MLSpread": 86
                        },
                        {
                            "Amount": 500,
                            "Currency": "CAD",
                            "Years": 10,
                            "CouponType": "FIX",
                            "Spread": 50,
                            "Yield": 1.209,
                            "3MLSpread": 13
                        },
                        {
                            "Amount": 500,
                            "Currency": "EUR",
                            "Years": 4,
                            "CouponType": "FIX",
                            "Spread": 35,
                            "Yield": -0.136,
                            "3MLSpread": 49
                        },
                        {
                            "Amount": 500,
                            "Currency": "EUR",
                            "Years": 8,
                            "CouponType": "FIX",
                            "Spread": 60,
                            "Yield": 0.248,
                            "3MLSpread": 81
                        },
                        {
                            "Amount": 500,
                            "Currency": "EUR",
                            "Years": 12,
                            "CouponType": "FIX",
                            "Spread": 90,
                            "Yield": 0.721,
                            "3MLSpread": 117
                        },
                        {
                            "Amount": 500,
                            "Currency": "USD",
                            "Years": 10,
                            "CouponType": "FIX",
                            "Spread": 90,
                            "Yield": 1.828,
                            "3MLSpread": 88
                        },
                        {
                            "Amount": 500,
                            "Currency": "USD",
                            "Years": 40,
                            "CouponType": "FIX",
                            "Spread": 130,
                            "Yield": 2.965,
                            "3MLSpread": 152
                        },
                        {
                            "Amount": 500,
                            "Currency": "EUR",
                            "Years": 12,
                            "CouponType": "FRN",
                            "Spread": 92,
                            "Yield": 0.718,
                            "3MLSpread": 112
                        },
                        {
                            "Amount": 500,
                            "Currency": "USD",
                            "Years": 10,
                            "CouponType": "FRN",
                            "Spread": 94,
                            "Yield": 1.826,
                            "3MLSpread": 86
                        },
                        {
                            "Amount": 500,
                            "Currency": "USD",
                            "Years": 40,
                            "CouponType": "FRN",
                            "Spread": 128,
                            "Yield": 2.962,
                            "3MLSpread": 150
                        }
                    ]
                },
                {
                    "Id": "395347",
                    "DateSent": "2020-12-30",
                    "Company": "Yearin",
                    "Preferred": "0",
                    "Quote": [
                        {
                            "Amount": 500,
                            "Currency": "USD",
                            "Years": 10,
                            "CouponType": "FIX",
                            "Spread": 75,
                            "Yield": 1.678,
                            "3MLSpread": 74
                        }
                    ]
                },
                {
                    "Id": "395284",
                    "DateSent": "2020-12-18",
                    "Company": "Condax",
                    "Preferred": "0",
                    "Quote": [
                        {
                            "Amount": 300,
                            "Currency": "USD",
                            "Years": 10,
                            "CouponType": "FIX",
                            "Spread": 100,
                            "Yield": null,
                            "3MLSpread": null
                        }
                    ]
                },
                {
                    "Id": null,
                    "DateSent": null,
                    "Company": "Opentech",
                    "Preferred": "1",
                    "Quote": null
                },
                {
                    "Id": null,
                    "DateSent": null,
                    "Company": "Golddex",
                    "Preferred": "1",
                    "Quote": null
                },
                {
                    "Id": null,
                    "DateSent": null,
                    "Company": "Warephase",
                    "Preferred": "1",
                    "Quote": null
                },
                {
                    "Id": null,
                    "DateSent": null,
                    "Company": "Donware",
                    "Preferred": "1",
                    "Quote": null
                },
                {
                    "Id": null,
                    "DateSent": null,
                    "Company": "Faxquote",
                    "Preferred": "1",
                    "Quote": null
                }
            ]
        },

        spreadList: [
            'Spread',
            'Yield',
            '3MLSpread',
        ],

    },
    getters,
    mutations,
    actions,
    strict: true,
})

Vue.store = store // dirty

export default store
