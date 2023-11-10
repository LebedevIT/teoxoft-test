import {
  defineStore
} from "pinia";
import {
  ref,
  watch
} from 'vue'

export const useEmployeeStore = defineStore('EmployeeStore', () => {
  const employeesStore = ref([{
      name: 'Павел',
      surname: 'Васнецов',
      seniority: 2,
      age: 22,
      address: 'Великая улица, 15'
    },
    {
      name: 'Виктор',
      surname: 'Петров',
      seniority: 5,
      age: 30,
      address: 'Московская улица, 1Б'
    },
    {
      name: 'Дмитрий',
      surname: 'Сидоров',
      seniority: 8,
      age: 32,
      address: 'Пушкинская улица, 18'
    },
    {
      name: 'Василий',
      surname: 'Соколов',
      seniority: 6,
      age: 36,
      address: 'Цветочная улица, 15'
    },
  ])

  const employeesOnStorage = localStorage.getItem('employees')

  if (employeesOnStorage) {
    employeesStore.value = JSON.parse(employeesOnStorage)
  } else {
    localStorage.setItem('employees', JSON.stringify(employeesStore.value))
  }

  watch(() => employeesStore, (state) => {
    localStorage.setItem('employees', JSON.stringify(state.value))
  }, {
    deep: true
  })

  const add_new_employee = (object) => {
    employeesStore.value.push({
      ...object
    })
  }

  const edit_employee = (object, index) => {
    employeesStore.value[index] = object
  }

  return {
    employeesStore,
    add_new_employee,
    edit_employee
  }

})