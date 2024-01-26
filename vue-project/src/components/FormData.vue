<template>
    <div class="m-0 p-6 border-solid border-2 rounded-lg">
        <form class="grid" autocomplete="off" @submit.prevent>
            <!-- text -->
            <div class="inputwrap mb-2 grid" v-for="(item, index) in formTitle" :key="index">
                <label :for="item" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ item }}</label>
                <div class="flex flex-row border-b border-gray-300 rounded-tl-lg rounded-tr-lg bg-gray-100">
                    <input type="text" disabled :id="item" v-model="uiForm[index]" 
                            class="appearance-none bg-transparent border-none font-medium text-gray-900 w-full p-2.5 focus:outline-none" required>
                    <button v-show="isEdit(item)" @click="promptBtn(index, item, uiForm[index])">
                        <img alt="edit" src="@/assets/img/pen.svg" width="25" height="25" class="ml-2 hover:opacity-50 transition ease-in-out">
                    </button>
                </div>
            </div>
            <!-- botton -->
            <div class="mt-5 mx-auto">
                <button @click="confirmBtn" 
                        class="text-gray-900 font-medium border-solid border-2 rounded-lg p-2 hover:bg-blue-500 hover:text-white transition ease-in-out">
                        {{ formBtn }}
                </button>
            </div>
        </form>
    </div>
    <Confirm
        :confirmValue="confirmValue"
        :confirmMask="confirmMask"
        ref="confirm"
    />
    <Prompt
        :promptId="promptId"
        :promptTitle="promptTitle"
        :promptMask="promptMask"
        :promptValue="promptValue"
        @value="valueEvent"
        ref="prompt"
    />
</template>
<script>
import Confirm from '@/components/pop-box/Confirm.vue';
import Prompt from '@/components/pop-box/Prompt.vue';
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';

export default {
    name: 'FormData',
    components: {
        Confirm, Prompt
    },
    setup() {
        const formBtn = '確認';
        const formTitle = {
            id: 'ID',
            name: '姓名',
            email: '信箱',
            phone: '手機'
        };
        const uiForm = reactive({
            id: '',
            name: '',
            email: '',
            phone: ''
        });
        // 判斷需編輯項目
        const isEdit = (item) => {
            return item === formTitle.name || item === formTitle.phone;
        };

        // confirm init
        const confirmValue = ref('');
        const confirmMask = ref(false);
        const confirm = ref(null);
        // confirm value
        const confirmBtn = () => {
            if (confirm.value) {
                confirm.value.confirmShow(true);
            }
        };

        // prompt init
        const promptId = ref('');
        const promptTitle = ref('');
        const promptValue = ref('');
        const promptMask = ref(false);
        const prompt = ref(null);
        // prompt value
        const promptBtn = (id, t, v) => {
            promptTitle.value = t;
            promptId.value = id;
            promptValue.value = v;
            if (prompt.value) {
                prompt.value.promptShow(v, true);
            }
        };
        const valueEvent = ({id, value}) => {
            uiForm[id] = value;
        };

        // get data info
        const dataInfo = () => {
            axios.get('https://random-data-api.com/api/v2/users').then((res) => {
                const hasStatus = res.status === 200 ? true : false;
                if(!hasStatus) {
                    console.log(`error status code: ${res.status}`);
                    return;
                }
                const { data } = res;
                console.log(data);
                uiForm.id = data.id;
                uiForm.name = data.username;
                uiForm.email = data.email;
                uiForm.phone = data.phone_number;

                // pop:confirm value
                confirmValue.value = data.username;

            }).catch((error) => {
                console.error(error);
            });
        };

        onMounted(() => {
            dataInfo();
        });
        
        
        return {
            formBtn, formTitle, uiForm,
            confirm, 
            confirmValue, confirmMask,
            prompt, 
            promptId, promptTitle, promptValue, promptMask,
            isEdit, dataInfo,
            confirmBtn, promptBtn,
            valueEvent
        }
    }
}
</script> 