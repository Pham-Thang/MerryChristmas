<template>
    <div id="fee-detail">
        <div class="modal"></div>
        <div class="dialog">
            <div class="dialog__header">
                <div class="title">{{mode==="ADD"? "Thêm khoản thu": mode==="EDIT"? "Sửa khoản thu":"..."}}</div>
                <div class="icon icon-x" @click="close"></div>
            </div>
            <div class="dialog__content">
                <div class="content__left">
                    <div class="row">
                        <div class="text">Tên khoản thu <span class="m-red">*</span></div>
                        <div class="input">
                            <input type="text" v-focus size="100"
                                @blur="validateData('FeeName')" 
                                :class="{'m-input': true, 'error-required': !validate.FeeName.Status}"
                                :title="validate.FeeName.Status? null:'Bạn phải nhập thông tin này!'"
                                v-model="fee.FeeName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="text">Thuộc nhóm khoản thu</div>
                        <div class="input">
                            <select name="feeGroup" v-model="fee.FeeGroupId" class="m-select">
                                <option v-for="(feeGroup,index) in listFeeGroup" :key="index" 
                                    :value="feeGroup.FeeGroupId"
                                    >{{feeGroup.FeeGroupName}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row m-flex">
                        <div class="m-flex-3">
                            <div class="text">Mức thu <span class="m-red">*</span></div>
                            <div class="input">
                                <input type="number" 
                                    v-model="fee.Price"
                                    @blur="validateData('Price')" 
                                    :class="{'m-input': true, 'error-required': !validate.Price.Status, 'm-text-right': true}"
                                    :title="validate.Price.Status? null:'Bạn phải nhập thông tin này!'" /> 
                                <label>đ/</label>
                            </div>
                        </div>
                        <div class="m-flex-1">
                            <div class="text">Đơn vị tính <span class="m-red">*</span></div>
                            <div class="input">
                                <select name="unit" v-model="fee.Unit"
                                    @blur="validateData('Unit')" 
                                    :class="{'m-select': true, 'error-required': !validate.Unit.Status}"
                                    :title="validate.Unit.Status? null:'Bạn phải nhập thông tin này!'">
                                    <option value="0">Ngày</option>
                                    <option value="1">Tuần</option>
                                    <option value="2">Tháng</option>
                                    <option value="3">Quý</option>
                                    <option value="4">Kỳ</option>
                                    <option value="5">Năm</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="text">Phạm vi thu <span class="m-red">*</span></div>
                        <div class="input">
                            <select name="applyObject"
                                v-model="fee.ApplyObject"
                                @blur="validateData('ApplyObject')" 
                                :class="{'m-select': true, 'error-required': !validate.ApplyObject.Status}"
                                :title="validate.ApplyObject.Status? null:'Bạn phải nhập thông tin này!'">
                                <option value="0">Cá nhân</option>
                                <option value="1">Lớp</option>
                                <option value="2">Khối</option>
                                <option value="3">Toàn trường</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="text">Tính chất</div>
                        <div class="input">
                            <select name="property" class="m-select" v-model="fee.Property">
                                <option value="0">Thu theo thỏa thuận</option>
                                <option value="1">Chi phí phát sinh</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="text">Kỳ thu <span class="m-red">*</span></div>
                        <div class="input">
                            <div class="m-flex m-flex-1">
                                <input type="radio" name="period" v-model="fee.Period" value="1"/>
                                <div>Tháng</div>
                            </div>
                            <div class="m-flex m-flex-1">
                                <input type="radio" name="period" v-model="fee.Period" value="2"/>
                                <div>Quý</div>
                            </div>
                            <div class="m-flex m-flex-1">
                                <input type="radio" name="period" v-model="fee.Period" value="3"/>
                                <div>Học kỳ</div>
                            </div>
                            <div class="m-flex m-flex-1">
                                <input type="radio" name="period" v-model="fee.Period" value="4"/>
                                <div>Năm học</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content__right">
                    <div class="row m-flex">
                        <div class="m-flex-1">
                            <input type="checkbox" id="IsApplyRemisson" v-model="fee.IsApplyRemisson"/>
                            <label for="IsApplyRemisson"><span></span>Áp dụng miễn giảm</label>
                        </div>
                        <div class="m-flex-1">
                            <input type="checkbox" id="AllowCreateReceipt" v-model="fee.AllowCreateReceipt"/>
                            <label for="AllowCreateReceipt"><span></span>Cho phép xuất chứng từ</label>
                        </div>
                    </div>
                    <div class="row m-flex">
                        <div class="m-flex-1">
                            <input type="checkbox" id="IsRequire" v-model="fee.IsRequire"/>
                            <label for="IsRequire"><span></span>Khoản thu bắt buộc</label>
                        </div>
                        <div class="m-flex-1">
                            <input type="checkbox" id="IsInternal" v-model="fee.IsInternal"/>
                            <label for="IsInternal"><span></span>Cho phép hoàn trả</label>
                        </div>
                    </div>
                    <div class="row m-flex">
                        <div class="m-flex-1">
                            <input type="checkbox" id="AllowCreateInvoice" v-model="fee.AllowCreateInvoice"/>
                            <label for="AllowCreateInvoice"><span></span>Cho phép xuất hóa đơn</label>
                        </div>
                        <div class="m-flex-1">
                            <input type="checkbox" id="IsSystem" v-model="fee.IsSystem"/>
                            <label for="IsSystem"><span></span>Thu nội bộ</label>
                        </div>
                    </div>
                    <div class="row m-flex">
                        <div class="m-flex-1">
                            <input type="checkbox" />
                            <label>Phân loại đăng ký</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <div class="footer__item float--left" v-if="mode === 'EDIT'">
                    <input type="checkbox" id="IsActive" v-model="fee.IsActive"/>
                    <label for="IsActive"><span></span>Ngừng theo dõi</label>
                </div>
                <div class="footer__item float--right">
                    <button class="m-button" @click="saveOnClick(true)">Lưu</button>
                </div>
                <div class="footer__item float--right" v-if="mode === 'ADD'">
                    <button class="m-button" @click="saveOnClick(false)">Lưu và thêm mới</button>
                </div>
                <div class="footer__item float--right">
                    <button class="m-second-button" @click="close()">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            fee: {
                FeeName: "",
                FeeGroupId: null,
                Price: null,
                Unit: 2,
                ApplyObject: 3,
                Property: null,
                Period: "1",
                IsApplyRemisson: false,
                IsRequire: false,
                AllowCreateInvoice: true,
                AllowCreateReceipt: true,
                IsActive: true,
                IsInternal: false,
                IsSystem: false
            },
            validate: {
                FeeName: {
                    Status: true,
                    Require: true,
                },
                Price: {
                    Status: true,
                    Require: true,
                },
                Unit: {
                    Status: true,
                    Require: true,
                },
                ApplyObject: {
                    Status: true,
                    Require: true,
                },
                Period: {
                    Status: true,
                    Require: true,
                },
                IsApplyRemisson: {
                    Status: true,
                    Require: true,
                },
                IsRequire: {
                    Status: true,
                    Require: true,
                },
                AllowCreateInvoice: {
                    Status: true,
                    Require: true,
                },
                AllowCreateReceipt: {
                    Status: true,
                    Require: true,
                },
                IsActive: {
                    Status: true,
                    Require: true,
                },
                IsInternal: {
                    Status: true,
                    Require: true,
                },
                IsSystem: {
                    Status: true,
                    Require: true,
                }
            }
        }
    },
    props: {
        mode: String,
        listFeeGroup: Array,
        feeId: Number
    },
    methods: {
        close() {
            this.$emit('close');
        },
        reload() {
            this.$emit('reloadData');
        },
        validateData(key) {
            if (this.validate[key].Require == true && (this.fee[key] === null || this.fee[key] === "")) {
                this.validate[key].Status = false;
            } else {
                this.validate[key].Status = true;
            }
        },
        saveOnClick(close) {
            var flag = true;
            for (var key in this.validate) {
                this.validateData(key);
                if (this.validate[key].Status === false) {
                    flag = false;
                    break;
                }
            }
            if (flag && this.mode === 'ADD') {
                axios.post('http://localhost:60931/api/v1/Fees', this.fee)
                .then(res => {
                    console.log(res.data);
                    this.reload();
                    if (close) this.close();
                })
                .catch(res => {
                    alert(res);
                })
            } else if (flag && this.mode === 'EDIT') {
                axios.put('http://localhost:60931/api/v1/Fees', this.fee)
                .then(res => {
                    console.log(res.data);
                    this.reload();
                    this.close();
                })
                .catch(res => {
                    alert(res);
                })
            }
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    mounted() {
        if (this.feeId !== null) {
            axios.get('http://localhost:60931/api/v1/Fees/' + this.feeId)
                .then(res => {
                    this.fee = res.data;
                })
                .catch(res => {
                    alert(res);
                })
        }
    }
}
</script>
<style scoped>
.modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #cccccc;
    opacity: 0.6;
    z-index: 3;
}

.dialog {
    position: fixed;
    z-index: 3;
    width: calc(1000px - 24px - 24px);
    height: 600px;
    top: calc((100vh - 600px) / 2);
    left: calc((100vw - 1000px) / 2);
    background-color: #fff;
    border-radius: 4px;
    padding-left: 24px;
    padding-right: 24px;
    overflow: hidden;
}

    .dialog .dialog__header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 70px;
        overflow: hidden;
    }

        .dialog .dialog__header .title {
            font-family: 'OpenSans-Bold';
            font-size: 20px;
        }

        .dialog .dialog__header .icon {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            cursor: pointer;
        }

    .dialog .dialog__content {
        display: flex;
        width: 100%;
        height: calc(100% - 70px - 70px);
    }

        .dialog .dialog__content .content__left{
            flex: 1;
            padding: 12px 24px 12px 0;
            height: calc(100% - 24px);
            border-right: 1px solid #cccccc;
        }

            .dialog .dialog__content .content__left .row {
                width: 100%;
                height: 66px;
            }

                .dialog .dialog__content .content__left .row .text{
                    line-height: 32px;
                }

                .dialog .dialog__content .content__left .row .input{
                    display: flex;
                }

                    .dialog .dialog__content .content__left .row .input label{
                        display: flex;
                        align-items: center;
                        padding: 0 4px 0 4px;
                    }

        .dialog .dialog__content .content__right{
            flex: 1;
            height: calc(100% - 24px);
            padding: 12px 0 12px 24px;
        }

            .dialog .dialog__content .content__right .row{
                width: 100%;
                height: 40px;
                overflow: hidden;
            }

            .dialog .dialog__content .content__right .row > div{
                display: flex;
                align-items: center;
            }

    .dialog .dialog__footer {
        width: 100%;
        height: 70px;
    }

        .dialog .dialog__footer .footer__item {
            height: 100%;
            display: flex;
            align-items: center;
        }

        .dialog .dialog__footer .footer__item.float--right {
            margin-left: 8px;
        }
.error-required {
    border: 1px solid red;
}
</style>