<template>
    <modal>
        <vue-form :state="formstate" @submit.prevent="save">

            <validate tag="label">
                <span>Name *</span>
                <input class="input-text" v-model="task.name" required name="name"/>

                <field-messages name="name">
                    <div class="success">Success!</div>
                    <div slot="required" class="error">Name is a required field</div>
                </field-messages>
            </validate>
            <validate tag="label">
                <span>Description *</span>
                    <textarea class="input-text" v-model="task.description" required
                              name="description"></textarea>

                <field-messages name="description">
                    <div class="success">Success!</div>
                    <div slot="required" class="error">Description is a required field</div>
                </field-messages>
            </validate>

            <validate tag="label">
                <span>Status *</span>

                <select required name="status" v-model="task.status">
                    <option v-for="status in statuses" :value="status">
                        {{status.name}}
                    </option>
                </select>
                <field-messages name="status">
                    <div class="success">Success!</div>
                    <div slot="required" class="error">Status is a required field</div>
                </field-messages>
            </validate>

            <button type="submit">Submit</button>
            <button @click.prevent="breakEdit">Cancle</button>

        </vue-form>
    </modal>
</template>

<script>
    import Status from '../../model/Status';
    export default {
        props:['task','statuses'],

        data(){
            return{
                formstate: {}, //need for vue-for this is used for form validation
            };
        },
        components:{
            'modal': require('./Modal.vue'),
        },
        methods:{
            save(){
                if (this.formstate.$invalid) {
                    return;
                }
                this.$emit('save');
            },
            breakEdit(){
                this.$emit('break');
            }
        }

    };

</script>

<style scoped>

    label {
        width: 100%;
    }

    textarea {
        width: 100%;
        border-radius: 5px;
    }

    select {
        width: 100%;
        background-color: white;
        border: none;
        border-bottom: 1px solid;
        height: 30px;
    }
    .success {
        color: #5a804d;
    }

    .error {
        color: #ff8786;
    }

    .input-text {
        width: 100%;
        border-radius: 5px;
        line-height: 30px;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>