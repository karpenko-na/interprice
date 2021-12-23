<template>
    <div id="app">
        <div class="container">
            <div class="row mt-2">
                <div class="col-12">
                    <div class="d-flex flex-wrap align-items-center">
                        <b-button-group class="mr-4 mb-3">
                            <template v-for="currencyItem in currencyList">
                                <b-button v-if="currencyItem===currencySelected" variant="primary" :key="currencyItem">
                                    {{ currencyItem }}
                                </b-button>
                                <b-button v-else variant="outline-primary" :key="currencyItem"
                                          @click="onCurrencySelect(currencyItem)">
                                    {{ currencyItem }}
                                </b-button>
                            </template>
                        </b-button-group>
                        <b-button-group class="mr-4 mb-3">
                            <template v-for="yearItem in yearList">
                                <b-button v-if="inYearSelected(yearItem)" variant="primary" :key="yearItem"
                                          class="text-nowrap" @click="onYearSelect(yearItem)">
                                    {{ yearItem }} YRS
                                </b-button>
                                <b-button v-else variant="outline-primary" :key="yearItem"
                                          @click="onYearSelect(yearItem)">
                                    {{ yearItem }} YRS
                                </b-button>
                            </template>
                        </b-button-group>
                        <b-button-group class="mr-4 mb-3">
                            <template v-for="spreadItem in spreadList">
                                <b-button v-if="spreadItem===spreadSelected" variant="primary" :key="spreadItem">
                                    {{ spreadItem }}
                                </b-button>
                                <b-button v-else variant="outline-primary" :key="spreadItem"
                                          @click="onSpreanSelect(spreadItem)">
                                    {{ spreadItem }}
                                </b-button>
                            </template>
                        </b-button-group>
                        <b-input
                            debounce="500"
                            class="mr-4 mb-3"
                            v-model="fieldCompanyFilter"
                            placeholder="Filter by company name"></b-input>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table class="table">
                        <thead>
                        <tr>
                            <th rowspan="2" class="border-top-0">

                            </th>
                            <th rowspan="2" class="border-top-0 cursor-pointer font-weight-normal" @click="toggleDataSort('date')">
                                <span class="text-muted">DATE SENT</span>
                                <span class="ml-2"><font-awesome-icon :icon="dataFilter.date ? 'sort-up' : 'sort-down'"></font-awesome-icon></span>
                            </th>
                            <th rowspan="2" class="border-top-0 cursor-pointer font-weight-normal" @click="toggleDataSort('company')">
                                <span class="text-muted">COMPANY</span>
                                <span class="ml-2"><font-awesome-icon class="text-muted" :icon="dataFilter.company ? 'sort-up' : 'sort-down'"></font-awesome-icon></span>
                            </th>
                            <th v-for="yearItem in yearListSelected" :key="yearItem" colspan="2" class="border-top-0 text-center">
                                {{ yearItem }} YRS
                            </th>
                        </tr>
                        <tr>
                            <template v-for="yearItem in yearListSelected">
                                <th :key="yearItem+'FIX'" class="text-center text-muted font-weight-normal">FIX</th>
                                <th :key="yearItem+'FRN'" class="text-center text-muted font-weight-normal">FRN</th>
                            </template>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="(dataItem, key) in dataSortedAndFiltered">
                            <tr :key="key">
                                <td>
                                    <span class="cursor-pointer" v-if="!isNullOrEmpty(dataItem.Quote)">
                                        <font-awesome-icon v-if="isDataOpened(dataItem.Id)" icon="chevron-down"
                                                           @click="toggleDataOpened(dataItem.Id)"></font-awesome-icon>
                                        <font-awesome-icon v-else icon="chevron-right"
                                                           @click="toggleDataOpened(dataItem.Id)"></font-awesome-icon>
                                    </span>
                                </td>
                                <td class="text-nowrap">{{ getDate(dataItem.DateSent) }}</td>
                                <td class="font-weight-bold" :class="{'text-muted':isNullOrEmpty(dataItem.Quote)}">
                                    {{ dataItem.Company }}
                                </td>
                                <template v-for="yearItem in yearListSelected">
                                    <td :key="yearItem+'FIX'" class="text-center text-nowrap font-weight-normal">
                                        {{ getValue(dataItem.Quote, yearItem, spreadSelected, 'FIX') }}
                                    </td>
                                    <td :key="yearItem+'FRN'" class="text-center text-nowrap font-weight-normal">
                                        {{ getValue(dataItem.Quote, yearItem, spreadSelected, 'FRN') }}
                                    </td>
                                </template>
                            </tr>
                            <template v-if="!isNullOrEmpty(dataItem.Quote)&&isDataOpened(dataItem.Id)">
                                <tr v-for="spreadItem in spreadListNotSelected" :key="key+'-'+spreadItem">
                                    <td></td>
                                    <td class="text-nowrap"></td>
                                    <td>{{ spreadItem }}</td>
                                    <template v-for="yearItem in yearListSelected">
                                        <td :key="yearItem+'FIX'" class="text-center text-nowrap font-weight-normal">
                                            {{ getValue(dataItem.Quote, yearItem, spreadItem, 'FIX') }}
                                        </td>
                                        <td :key="yearItem+'FRN'" class="text-center text-nowrap font-weight-normal">
                                            {{ getValue(dataItem.Quote, yearItem, spreadItem, 'FRN') }}
                                        </td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                        </tbody>
                        <tfoot>
                        <tr class="border" style="border-color: #979797 !important">
                            <th colspan="2" class="border-top-0"></th>
                            <th class="border-top-0">Average by {{ spreadSelected }}</th>
                            <template v-for="yearItem in yearListSelected">
                                <th :key="yearItem+'FIX'" class="border-top-0 text-center text-nowrap font-weight-normal">

                                </th>
                                <th :key="yearItem+'FRN'" class="border-top-0 text-center text-nowrap font-weight-normal">

                                </th>
                            </template>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import {mapState, mapGetters} from "vuex";

export default {
    name: "App",
    data() {
        return {}
    },
    mounted() {
        this.$store.commit('setYearSelected', this.yearList)
    },
    computed: {
        ...mapState([
            'spreadList',
            'currencySelected',
            'yearSelected',
            'spreadSelected',
            'dataOpened',
            'dataFilter',
        ]),
        ...mapGetters([
            'currencyList',
            'yearList',
            'dataSortedAndFiltered',
        ]),
        fieldCompanyFilter: {
            get() {
                return this.$store.state.companyFilter
            },
            set(value) {
                this.$store.commit('setCompanyFilter', _.trim(value))
            }
        },
        yearListSelected: function () {
            let _self = this
            return _.filter(this.yearList, function (yearItem) {
                return _.includes(_self.yearSelected, yearItem)
            })
        },
        spreadListNotSelected: function () {
            let _self = this
            return _.filter(this.spreadList, function (yearItem) {
                return yearItem !== _self.spreadSelected
            })
        },
    },
    methods: {
        inYearSelected(item) {
            return _.includes(this.yearSelected, item)
        },
        isDataOpened(id) {
            return _.includes(this.dataOpened, id)
        },
        toggleDataOpened(id) {
            let dataOpened = _.assign([], this.dataOpened)
            if (_.includes(dataOpened, id)) {
                dataOpened = _.filter(dataOpened, function (dataId) {
                    return dataId !== id
                })
            } else {
                dataOpened.push(id)
            }
            this.$store.commit('setDataOpened', dataOpened)
        },
        toggleDataSort(field) {
            this.$store.commit('setDataSort', field)
        },
        onCurrencySelect(item) {
            this.$store.commit('setCurrency', item)
        },
        onYearSelect(item) {
            let yearSelected = _.assign([], this.yearSelected)
            if (_.includes(yearSelected, item)) {
                yearSelected = _.filter(yearSelected, function (yearItem) {
                    return yearItem !== item
                })
            } else {
                yearSelected.push(item)
            }
            this.$store.commit('setYearSelected', yearSelected)
        },
        onSpreanSelect(item) {
            this.$store.commit('setSpreadSelected', item)
        },
        getDate(val) {
            return !_.isNull(val) ? this.$moment(val, 'YYYY-MM-DD').format('DD-MMM-YYYY') : '';
        },
        getValue(quotes, year, spread, couponType) {
            let valText = ''
            let val = _.find(quotes, (quote) => {
                return quote.Years === year && quote.CouponType === couponType
            })
            if (!_.isUndefined(val) && !_.isNull(val[spread])) {
                if (spread === 'Spread' || spread === '3MLSpread') {
                    valText = '+' + val[spread] + 'bp'
                } else if (spread === 'Yield') {
                    valText = val[spread] + '%'
                }
            }
            return valText
        },
        isNullOrEmpty(val) {
            return _.isNull(val) || _.isEmpty(val)
        }
    }
};
</script>

<style lang="scss">
#app {
    color: #000;
}
</style>
