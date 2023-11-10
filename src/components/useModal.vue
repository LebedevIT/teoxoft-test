<template>
    <article class="modal-overlay" v-if="isModalOpened">
        <section class="content">
            <header>
                <h1 v-if="!isEdit">Добавить нового сотрудника</h1>
                <h1 v-else>Редактировать сотрудника</h1>
            </header>
            <section class="body">
                <section class="name">
                    <span>Имя:</span>
                    <input type="text" v-model="name" placeholder="Введите имя" />
                </section>
                <section class="surname">
                    <span>Фамилия:</span>
                    <input type="text" v-model="surname" placeholder="Введите фамилию" />
                </section>
                <section class="seniority">
                    <span>Стаж:</span>
                    <input type="number" v-model="seniority" placeholder="Введите стаж" />
                </section>
                <section class="age">
                    <span>Возраст:</span>
                    <input type="number" v-model="age" placeholder="Введите возраст" />
                </section>
                <section class="address">
                    <span>Адрес:</span>
                    <input type="text" v-model="address" placeholder="Введите адрес" />
                </section>
            </section>
            <useButton v-if="!isEdit" value="Добавить" @click="add_click_handler"></useButton>
            <useButton v-else value="Сохранить" @click="save_click_handler"></useButton>
            <span class="close" @click="isModalOpened = false">+</span>
        </section>
    </article>
</template>

<script setup>
    import useButton from './useButton.vue';
    import {
        useEmployeeStore
    } from '../stores/employees'

    const employees = useEmployeeStore()

    import {
        ref
    } from 'vue'

    const isModalOpened = ref(false)
    const isEdit = ref(false)

    const name = ref('')
    const surname = ref('')
    const seniority = ref('')
    const age = ref('')
    const address = ref('')
    const id = ref()

    function open(editPage, employee, index) {
        isModalOpened.value = true
        if (editPage && employee) {
            isEdit.value = true
            name.value = employee.name
            surname.value = employee.surname
            seniority.value = String(employee.seniority)
            age.value = String(employee.age)
            address.value = employee.address
            id.value = index
        }else {
            isEdit.value = false
        }
    }

    function check_inputs() {
        if (name.value != '' &&
            surname.value != '' &&
            seniority.value != '' &&
            age.value != '' &&
            address.value != '') {
                return true
        }else {
            return alert('Вы заполнили не все поля.')
        }
    }

    function add_click_handler() {
        if (check_inputs()) {
            const new_employee = {
                name: name.value,
                surname: surname.value,
                seniority: seniority.value,
                age: age.value,
                address: address.value
            }
            employees.add_new_employee(new_employee)
            isModalOpened.value = false
        }
    }

    function save_click_handler() {
        if (check_inputs()) {
            const edit_employee = {
                name: name.value,
                surname: surname.value,
                seniority: seniority.value,
                age: age.value,
                address: address.value
            }
            employees.edit_employee(edit_employee, id.value)
            isModalOpened.value = false
        }
    }

    defineExpose({
        open
    })
</script>

<style scoped lang="scss">
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30%;
            min-width: 350px;
            height: fit-content;
            padding: 15px;
            box-sizing: border-box;
            background-color: #282828;
            border-radius: 10px;
            position: relative;
            gap: 15px;

            .body {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .name,
                .surname,
                .seniority,
                .age,
                .address {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    gap: 30px;
                }

                input {
                    border: 0;
                    outline: 0;
                    background-color: #181818;
                    padding: 7px 10px;
                    border: 1px solid #f2f2f2;
                    border-radius: 5px;
                    color: #f2f2f2;
                }
            }

            .close {
                font: 400 28px 'Montserrat';
                transform: rotate(-45deg);
                position: absolute;
                top: 10px;
                right: 15px;
                transition: .3s;

                &:hover {
                    cursor: pointer;
                    opacity: .7;
                }
            }
        }
    }
</style>