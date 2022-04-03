// 請求書一覧　通常
Vue.component('invoice-list', {
    template: `
    <div>
        <b-row class="mt-1">
            <b-col></b-col>
            <b-col cols="11">
                <b-card border-variant="white" class="mb-3 text-center" header="請求書一覧"
                    header-border-variant="light">
                    <b-row>
                        <b-col sm>
                            <b-input-group>
                                <b-form-input v-model="searchInvoiceWord" id="searchInvoiceWord" size="sm"
                                    placeholder="🔍　日付 or 顧客名">
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button variant="primary" size="sm" @click="searchInvoice">検索
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col sm>
                        </b-col>
                        <b-col sm>
                            <b-row align-h="end">
                                <b-form-checkbox class="mr-3" @change="changeIsInvoicesShowAll" v-model="isInvoicesShowAll">全て表示</b-form-checkbox>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row align-h="end">
                        <p class="mr-3">表示件数 {{ invoicesIndicateCount }}件</p>
                    </b-row>
                    <b-table responsive hover small id="invoicetable" sort-by="ID" small label="Table Options"
                        :items=invoicesIndicateIndex :fields="[
                    {  key: 'update', label: '' },
                    {  key: 'id', thClass: 'd-none', tdClass: 'd-none' },
                    {  key: 'applyNumber', label: '請求番号', thClass: 'text-center', tdClass: 'text-center' },
                    {  key: 'applyDate', label: '日付', thClass: 'text-center', tdClass: 'text-center' },
                    {  key: 'customerName', label: '顧客名', thClass: 'text-center', },
                    {  key: 'title', label: '件名', thClass: 'text-center', },
                    {  key: 'totalAmount', label: '請求金額', thClass: 'text-center', tdClass: 'text-right' },
                    {  key: 'numberOfAttachments', label: '', tdClass: 'text-center' },
                ]" :tbody-tr-class="rowClass">
                        <template v-slot:cell(update)="data">
                            <router-link to="?page=show">
                                <b-button variant="primary" @click="selectInvoice(data.item)">
                                    <i class="fas fa-edit"></i>
                                </b-button>
                            </router-link>
                        </template>
                        <template v-slot:cell(applyDate)="data">
                            {{formatDate(data.item.applyDate)}}
                        </template>
                        <template v-slot:cell(totalAmount)="data">
                            {{amountCalculation(data.item)|nf}}
                        </template>
                        <template v-slot:cell(numberOfAttachments)="data">
                            <b-img v-if="countedFiles[data.item.applyNumber] > 0"
                                src="../static/images/icon/icon_clip.png"></b-img>
                        </template>

                    </b-table>
                </b-card>
            </b-col>
            <b-col></b-col>
        </b-row>
    </div>
    `,
    // data: {
    //     parentIsInvoicesShowAll: false,
    // },
    props: {
        selectInvoice: Function,
        searchInvoice: Function,
        rowClass: Function,
        countedFiles: Function,
        isInvoicesShowAll: Boolean,
        searchInvoiceWord: String,
        invoicesIndicateCount: Number,
        invoicesIndicateIndex: Array,
    },
    methods: {
        //日付カラム
        formatDate(date) {
            if (!!date) return moment(date).format("YYYY/MM/DD");
        },
        //請求金額カラム
        amountCalculation(invoice) {
            if (!invoice.invoice_items.length) return 0;
            let amount = invoice.invoice_items.map(item => item.count * Math.round(item.price)).reduce((a, b) => a + b);
            if (invoice.isTaxExp === true) return Math.round(amount * (1 + invoice.tax / 100));
            return amount;
        },
        changeIsInvoicesShowAll() {
            this.$emit('emit-event', this.isInvoicesShowAll);
        }
    },
})

// 請求書一覧　未入金チェック
Vue.component('invoice-list-payment', {
    template: `
    <div>
        <b-row class="mt-1">
            <b-col></b-col>
            <b-col cols="11">
                <b-card border-variant="white" class="mb-3 text-center" header="請求書一覧"
                    header-border-variant="light">
                    <b-row>
                        <b-col sm>
                            <b-input-group>
                                <b-form-input v-model="searchInvoiceWord" id="searchInvoiceWord" size="sm"
                                    placeholder="🔍　日付 or 顧客名">
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button variant="primary" size="sm" @click="searchInvoice">検索
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col sm>
                        </b-col>
                        <b-col sm>
                            <b-row align-h="end">
                                <p>ここに日付検索</p>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row align-h="end">
                        <p class="mr-3">表示件数 {{ invoicesIndicateCount }}件</p>
                    </b-row>
                    <b-table responsive hover small id="invoicetable" sort-by="ID" small label="Table Options"
                        :items=invoicesIndicateIndex :fields="[
                    {  key: 'update', label: '' },
                    {  key: 'id', thClass: 'd-none', tdClass: 'd-none' },
                    {  key: 'applyNumber', label: '請求番号', thClass: 'text-center', tdClass: 'text-center' },
                    {  key: 'applyDate', label: '日付', thClass: 'text-center', tdClass: 'text-center' },
                    {  key: 'customerName', label: '顧客名', thClass: 'text-center', },
                    {  key: 'title', label: '件名', thClass: 'text-center', },
                    {  key: 'totalAmount', label: '請求金額', thClass: 'text-center', tdClass: 'text-right' },
                    {  key: 'numberOfAttachments', label: '', tdClass: 'text-center' },
                ]" :tbody-tr-class="rowClass">
                        <template v-slot:cell(update)="data">
                            <router-link to="?page=show">
                                <b-button variant="primary" @click="selectInvoice(data.item)">
                                    <i class="fas fa-edit"></i>
                                </b-button>
                            </router-link>
                        </template>
                        <template v-slot:cell(applyDate)="data">
                            {{formatDate(data.item.applyDate)}}
                        </template>
                        <template v-slot:cell(totalAmount)="data">
                            {{amountCalculation(data.item)|nf}}
                        </template>
                        <template v-slot:cell(numberOfAttachments)="data">
                            <b-img v-if="countedFiles[data.item.applyNumber] > 0"
                                src="../static/images/icon/icon_clip.png"></b-img>
                        </template>

                    </b-table>
                </b-card>
            </b-col>
            <b-col></b-col>
        </b-row>
    </div>
    `,
    props: {
        selectInvoice: Function,
        searchInvoice: Function,
        rowClass: Function,
        countedFiles: Function,
        searchInvoiceWord: String,
        invoicesIndicateCount: Number,
        invoicesIndicateIndex: Array,
    },
    methods: {
        //日付カラム
        formatDate(date) {
            if (!!date) return moment(date).format("YYYY/MM/DD");
        },
        //請求金額カラム
        amountCalculation(invoice) {
            if (!invoice.invoice_items.length) return 0;
            let amount = invoice.invoice_items.map(item => item.count * Math.round(item.price)).reduce((a, b) => a + b);
            if (invoice.isTaxExp === true) return Math.round(amount * (1 + invoice.tax / 100));
            return amount;
        },
    },
})