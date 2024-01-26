<style>
@import '@/assets/popBox.css';
</style>
<template>
    <div class="mask-box" v-show="mask">
        <div class="mask-rela-div">
            <div class="mask-abso-div">
                <div class="mask-content-div">
                    <h1 class="mb-5">{{ popContent }}</h1>
                    <input type="text" v-model.once="value"
                            class="font-medium text-gray-900 border-b border-gray-300 rounded-tl-lg rounded-tr-lg bg-gray-50 
                    w-full mb-5 p-2.5 hover:bg-gray-100 focus:outline-none focus:border-blue-500 transition ease-in-out">
                    <span v-show="isPopMsg" class="relative top-[-15px] justify-self-start text-base text-red-500 font-bold">{{ popMsg }}</span>
                    <div class="justify-self-end">
                        <button class="mr-5 hover:bg-blue-500 hover:text-white" @click="promptHidden(id, value)">{{ popBtn.OK }}</button>
                        <button class="mr-5 hover:bg-red-700 hover:text-white" @click="promptCancle">{{ popBtn.Cancel }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, toRefs, watch } from 'vue';

export default {
    name: "Prompt",
    props: {
        promptId: String,
        promptTitle: String,
        promptValue: String,
        promptMask: Boolean
    },
    emits: ['id','title','value','mask'],
    setup(props, {emit}) {
        const { promptId, promptTitle, promptValue, promptMask } = toRefs(props);
        const id = ref(promptId.value);
        const title = ref(promptTitle.value);
        const value = ref(promptValue.value);
        const mask = ref(promptMask.value);
        
        const popContent = ref('');
        const popMsg = '*欄位不可為空';
        const popBtn = {
            OK: '確認',
            Cancel: '取消'
        };

        let isPopMsg = ref(false);
        
        // show
        const promptShow = (v, bool) => {
            value.value = v;
            mask.value = bool == true ? true : false;
        }
        // hidden
        const promptHidden = (id, v) => {
            if (v != false || v.length != 0) {
                emit('value', {id: id, value: v});
            }
            isPopMsg.value = v.length == 0 ? true : false;
            mask.value = isPopMsg.value == false ? false : true;
        }
        // close
        const promptCancle = () => {
            isPopMsg.value = false;
            mask.value = false;
        }

        watch(promptId, (n) => {
            emit('id', n);
            id.value = n;
        });
        watch(promptTitle, (n) => {
            emit('title', n);
            title.value = n;
            popContent.value = `請修改您的${n}：`;
        });
        watch(promptValue, (n) => {
            emit('value', n);
            value.value = n;
        });
        watch(promptMask, (n) => {
            emit('mask', n);
            mask.value = n;
        });

        return {
            popContent, popBtn, popMsg,
            isPopMsg,
            id, title, value, mask,
            promptShow, promptHidden, promptCancle
        }
    }
}
</script>