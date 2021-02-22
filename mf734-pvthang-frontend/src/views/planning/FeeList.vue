<template>
    <div id="fee-list">
        <div class="menu">
            <div class="menu__tab">Quy trình</div>
            <div class="menu__tab current--tab">Danh sách khoản thu</div>
            <div class="menu__tab">Đăng ký khoản thu</div>
            <div class="menu__tab">danh sách miễn giảm</div>
        </div>
        <div class="option">
            <div class="option__item float--left">
                <input type="checkbox" id="displayFeeInActive"/>
                <label for="displayFeeInActive"><span></span>Hiển thị khoản thu ngừng theo dõi</label>
            </div>
            <div class="option__item float--right">
                <button class="m-icon-button icon-delete"></button>
            </div>
            <div class="option__item float--right">
                <button class="m-second-button">Sắp lại thứ tự</button>
            </div>
            <div class="option__item float--right">
                <button class="m-button" @click="btnAddOnClick">Thêm mới</button>
            </div>
        </div>
        <div class="table">
            <table>
                <thead>
                    <tr class="odd-row">
                        <th class="selectCol">
                            <input type="checkbox" id="0" v-model="selectAllRows"/>
                            <label for="0"><span></span></label>
                        </th>
                        <th v-for="col in cols" :key="col.key">{{col.title}}</th>
                        <th class="optionCol"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(fee, index) in listFee" :key="index" 
                        :class="{'odd-row': index%2 === 1, 'row-on-select': feeIds[fee.FeeId + ''] === true}">
                        <td class="selectCol">
                            <input type="checkbox" :id="fee.FeeId" v-model="feeIds[fee.FeeId + '']"/>
                            <label :for="fee.FeeId"><span></span></label>
                        </td>
                        <td v-for="col in cols" :key="col.key" >{{fee[col.key]}}</td>
                        <td class="optionCol">
                            <div class="m-flex">
                                <div class="icon icon-edit" @click="btnEditOnClick"></div>
                                <div class="icon icon-duplicate"></div>
                                <div class="icon icon-delete"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer">Tổng số: {{listFee.length}} kết quả</div>
        <FeeDetail v-if="formDetail" @close="closeForm" :mode="formMode" :listFeeGroup="listFeeGroup"/>
    </div>
</template>
<script>
import FeeDetail from './FeeDetail'
import axios from 'axios'

export default {
    data() {
        return {
            cols: [
                {
                    key: "FeeName",
                    title: "Tên khoản thu"
                },
                {
                    key: "FeeGroupName",
                    title: "Nhóm khoản thu"
                },
                {
                    key: "Price",
                    title: "Mức thu"
                },
                {
                    key: "Period",
                    title: "Kỳ thu"
                },
                {
                    key: "ApplyObject",
                    title: "Thời điểm thu"
                },
                {
                    key: "IsApplyRemisson",
                    title: "Áp dụng miễn giảm"
                },
                {
                    key: "AllowCreateInvoice",
                    title: "Cho xuất hóa đơn"
                },
                {
                    key: "AllowCreateReceipt",
                    title: "Cho xuất chứng từ"
                },
                {
                    key: "IsInternal",
                    title: "Cho phép hoàn trả"
                },
                {
                    key: "IsRequire",
                    title: "Khoản thu bắt buộc"
                },
                {
                    key: "IsActive",
                    title: "Đang theo dõi"
                }
            ],
            listFee: [],
            listFeeGroup: [],
            feeIds: {},
            formDetail: false,
            formMode: null,
        }
    },
    components: {
        FeeDetail
    },
    mounted() {
        this.loadData();
    },
    methods: {
        btnAddOnClick() {
            this.formMode = "ADD";
            this.formDetail = true;
        },
        btnEditOnClick() {
            this.formMode = "EDIT";
            this.formDetail = true;
        },
        closeForm() {
            this.formMode = null;
            this.formDetail = false;
        },
        loadData() {
            axios.get('http://localhost:60931/api/v1/Fees')
                .then(res => {
                    this.listFee = res.data;
                })
                .catch(res => {
                    alert(res);
                })
            axios.get('http://localhost:60931/api/v1/FeeGroups')
                .then(res => {
                    this.listFeeGroup = res.data;
                })
                .catch(res => {
                    alert(res);
                })
        }
    },
    computed: {
        selectAllRows: {
            get() {
                for (var i in this.listFee) {
                    if (this.feeIds[this.listFee[i].FeeId] !== true) {
                        return false;
                    }
                }
                return true;
            },
            set(val) {
                if (val === true) {
                    this.feeIds = {};
                    for (let i in this.listFee) {
                        console.log(i)
                        this.feeIds[this.listFee[i].FeeId] = true;
                    }
                } else {
                    // for (let i in this.listFee) {
                    //     if (this.feeIds[this.listFee[i].FeeId] !== true) {
                    //         return;
                    //     }
                    // }
                    for (let i in this.listFee) {
                        this.feeIds[this.listFee[i].FeeId] = false;
                    }
                }
            }
        }
    }
}
</script>
<style>
#fee-list {
    width: 100%;
    height: 100%;
}

.menu {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #F6F6F6;
    overflow: hidden;
}

    .menu .menu__tab {
        height: calc(40px - 3px);
        padding-left: 20px;
        padding-right: 20px;
        color: #CCCCCC;
        border-top: 3px solid #E9E9E9;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .menu .menu__tab.current--tab {
        border-top: 3px solid #0E9D50;
        color: #0E9D50;
        background-color: #fff;
        z-index: 3;
    }

.option {
    width: calc(100% - 24px);
    height: 50px;
    padding: 0px 12px 0px 12px;
}

    .option .option__item {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 8px;
    }

    .option .option__item.float--left {
        margin-left: 0;
    }

.table {
    width: calc(100% - 24px);
    height: calc(100% - 40px - 50px - 50px);
    margin: 0 12px 0 12px;
    overflow-x: auto;
    overflow-y: hidden;
}

        .table::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #E9EBEE;
    }

        .table::-webkit-scrollbar-thumb {
        width: 6px;
        height: 6px;
        background-color: #bbbbbb;
    }

        .table table {
            width: 100%;
            min-width: 1700px;
            height: 100%;
            border-collapse: collapse;
            border: 1px solid #e9e9e9;
        }

            .table table thead {
                width: calc(100% - 8px);
                background-color: #0E9D50;
            }

            .table table tbody {
                display: block;
                height: calc(100% - 10px);
                overflow-y: auto;
                overflow-x: hidden;
            }

                .table table tbody::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                    background-color: #E9EBEE;
                }

                .table table tbody::-webkit-scrollbar-thumb {
                    width: 6px;
                    height: 6px;
                    background-color: #bbbbbb;
                }

            .table table tr {
                width: 100%;
                display: table;
                table-layout: fixed;
                height: 40px;
            }

            .table table td, .table table th {
                border: 1px solid #e9e9e9;
            }

            .table table .selectCol {
                text-align: center;
                width: 40px;
            }

            .table table .optionCol {
                width: 80px;
            }

                .table table .optionCol .icon {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    margin: 0 2px 0 2px;
                }
            

            .table table .odd-row {
                background-color: #F5F6FA;
            }
            

            .table table .row-on-select {
                background-color: #cce8ff;
            }

.footer {
    width: calc(100% - 24px);
    height: 50px;
    padding: 0 12px 0 12px;
    display: flex;
    align-items: center;
}


</style>