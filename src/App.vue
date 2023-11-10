<template>
  <article class="wrapper">
    <useButton value="Добавить нового сотрудника" @click="modal.open(false)"></useButton>
    <section v-for="(employee, index) in employees.employeesStore" :key="employee" class="employee">
      <section class="name">
        <span>Имя:</span>
        <p>{{ employee.name }}</p>
      </section>
      <section class="surname">
        <span>Фамилия:</span>
        <p>{{ employee.surname }}</p>
      </section>
      <section class="seniority">
        <span>Стаж:</span>
        <p>{{ employee.seniority }}</p>
      </section>
      <section class="age">
        <span>Возраст:</span>
        <p>{{ employee.age }}</p>
      </section>
      <section class="address">
        <span>Адрес:</span>
        <p>{{ employee.address }}</p>
      </section>
      <section class="controls">
        <span>Редактировать:</span>
        <font-awesome-icon icon="pen-to-square" size="lg" @click="modal.open(true, employee, index)"/>
      </section>
    </section>
  </article>
  <useModal ref="modal"></useModal>
</template>

<script setup>
  import {
    ref
  } from 'vue'

  import useButton from './components/useButton.vue';
  import useModal from './components/useModal.vue';
  import { useEmployeeStore } from './stores/employees'

  const employees = useEmployeeStore()

  const modal = ref(null)

</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 150px;

    .employee {
      display: flex;
      gap: 20px;
      border: 1px solid var(--vt-c-divider-dark-2);
      border-radius: 8px;
      padding: 0.5rem;
      box-sizing: border-box;
      justify-content: space-between;
      width: 100%;

      .name,
      .surname,
      .seniority,
      .age,
      .address,
      .controls {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        font: 400 18px 'Montserrat';
        span {
          font: 300 12px 'Montserrat';
        }
      }

      .controls {
        align-items: center;

        svg {
          width: fit-content;
          transition: .3s;

          &:hover {
            cursor: pointer;
            opacity: .7;
          }
        }
      }
    }
  }
</style>