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
                        <button class="mr-5 hover:bg-blue-500 hover:text-white" @click="alertHidden">{{ popBtn }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, toRefs, watch } from 'vue';

export default {
    name: "Alert",
    props: {
        alertValue: String,
        alertMask: Boolean
    },
    emits: ['value','mask'],
    setup(props, {emit}) {
        const { alertValue, alertMask } = toRefs(props);
        const value = ref(alertValue.value);
        const mask = ref(alertMask.value);

        const popContent = ref('');
        const popBtn = '確認';

        // show
        const alertShow = (v) => {
            mask.value = v == true ? true : false;
        }
        // hidden
        const alertHidden = () => {
            mask.value = false;
        }

        watch(alertValue, (n) => {
            emit('value', n);
            value.value = n;
            popContent.value = `恭喜${n}修改完成囉！`;
        });
        watch(alertMask, (n) => {
            emit('mask', n);
            mask.value = n;
        });

        return {
            popContent, popBtn,
            value, mask,
            alertShow, alertHidden
        }
    }
}
</script>