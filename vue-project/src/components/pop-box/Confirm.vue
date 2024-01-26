<style>
@import '@/assets/popBox.css';
</style>
<template>
    <div class="mask-box" v-show="mask">
        <div class="mask-rela-div">
            <div class="mask-abso-div">
                <div class="mask-content-div">
                    <h1 class="mb-5">{{ popContent }}</h1>
                    <div class="justify-self-end">
                        <button class="mr-5 hover:bg-blue-500 hover:text-white" @click="alertBtn">{{ popBtn.OK }}</button>
                        <button class="mr-5 hover:bg-red-700 hover:text-white" @click="confirmHidden">{{ popBtn.Cancel }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Alert 
        :alertValue="alertValue"
        :alertMask="alertMask"
        ref="alert"
    />
</template>
<script>
import Alert from '@/components/pop-box/Alert.vue';
import { ref, toRefs, watch } from 'vue';

export default {
    name: "Confirm",
    components: {
        Alert
    },
    props: {
        confirmValue: String,
        confirmMask: Boolean
    },
    emits: ['value','mask'],
    setup(props, {emit}) {
        const { confirmValue, confirmMask } = toRefs(props);
        const value = ref(confirmValue.value);
        const mask = ref(confirmMask.value);

        const popContent = ref('');
        const popBtn = {
            OK: '確認',
            Cancel: '取消'
        };

        // show
        const confirmShow = (v) => {
            mask.value = v == true ? true : false;
        }
        // hidden
        const confirmHidden = () => {
            mask.value = false;
        }

        // alert info
        const alertValue = ref('');
        const alertMask = ref(false);

        // call alert
        const alert = ref(null);
        const alertBtn = () => {
            if (alert.value) {
                confirmHidden();
                alertValue.value = value.value;
                alert.value.alertShow(true);
            }
        }

        watch(confirmValue, (n) => {
            emit('value', n);
            value.value = n;
            popContent.value = `${n}您確定已修改完成？`;
        });
        watch(confirmMask, (n) => {
            emit('mask', n);
            mask.value = n;
        });

        return {
            popContent, popBtn,
            value, mask,
            alert, alertValue, alertMask, 
            alertBtn,
            confirmShow, confirmHidden,
        }
    }
}
</script>