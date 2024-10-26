<template>
  <form @submit.prevent="">
    <PCard class=" min-w-120">
      <template #content>
        <div class="flex flex-col gap-4">
          <div>
            <label for="username">Логин</label>
            <PInputText
              id="username"
              v-model="form.username"
              size="large"
              class="w-full"
              label="Логин"
              placeholder="Введите логин"
            />
          </div>
          <div>
            <label for="password">Пароль</label>
            <PInputText
              id="password"
              v-model="form.password"
              type="password"
              size="large"
              class="w-full"
              label="Логин"
              placeholder="Введите пароль"
            />
          </div>
          <div v-if="isReg">
            <label for="password-repeat">Повторите пароль</label>
            <PInputText
              id="password-repeat"
              v-model="passwordRepeat"
              type="password"
              size="large"
              class="w-full"
              label="Логин"
              placeholder="Введите пароль еще раз"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col gap-4 mt-8 justify-center">
          <PButton
            type="submit"
            size="large"
            :label="isReg ? 'Зарегистрироваться' : 'Войти'"
            class="w-full"
            @click="store.login(form.username, form.password)"
          />
          <div class="text-center">
            {{ isReg ? 'Уже есть аккаунт?' : 'Нет аккаунта?' }}
            <span
              class=" text-blue-500 underline cursor-pointer"
              @click="$router.replace({ name: 'auth', query: { type: isReg ? undefined : 'reg' } })"
            >
              {{ isReg ? 'Войти в аккаунт' : 'Зарегистрироваться' }}
            </span>
          </div>
        </div>
      </template>
    </PCard>
  </form>
</template>

<script setup lang="ts">
const store = useAuthStore();
const route = useRoute();
const isReg = computed(() => route.query.type === 'reg');

const form = reactive<Record<string, string>>({});

const passwordRepeat = ref('');
</script>

<style scoped lang="scss">
.p-card {
  width: 35rem;
}

.p-inputtext {
  border-color: transparent;
}
</style>
