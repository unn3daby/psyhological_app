<template>
  <div class="form">
    <p v-if="$route.query.type === 'reg'" class="message text-center q-mb-md">
      Для доступа к функциям приложения зарегистрируйтесь.
    </p>
    <p v-else class="message text-center q-mb-md">
      Для доступа к функциям приложения войдите в аккаунт.
    </p>
    <div v-if="$route.query.type === 'reg'" class="row">
      <label class="col-6 q-pr-xs">
        <input class="input" type="text" placeholder="" required>
        <span>Фамилия</span>
      </label>

      <label class="col-6 q-pl-xs">
        <input class="input" type="text" placeholder="" required>
        <span>Имя</span>
      </label>
    </div>

    <label>
      <input v-model="credentials.username" class="input" placeholder="" required>
      <span>Имя пользователя</span>
    </label>

    <label v-if="$route.query.type === 'reg'">
      <input v-model="credentials.email" class="input" placeholder="" required>
      <span>Электронная почта</span>
    </label>

    <label>
      <input v-model="credentials.password" class="input" type="password" placeholder="" required>
      <span>Пароль</span>
    </label>
    <label v-if="$route.query.type === 'reg'">
      <input class="input" type="password" placeholder="" required>
      <span>Подтверждение пароля</span>
    </label>
    <button class="submit" @click="login">
      {{ $route.query.type === 'reg' ? 'Зарегистрироваться' : 'Войти' }}
    </button>
    <p class="signin cursor-pointer">
      Еще нет аккаунта? <a @click="$router.push({ path: $route.path, query: { type: $route.query.type ? undefined : 'reg' } })">
        {{ $route.query.type === 'reg' ? 'Войти' : 'Зарегистрироваться' }}
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const credentials = reactive({
  username: '',
  email: '',
  password: '',
});

const store = useAuthStore();

async function login() {
  try {
    await store.login(credentials.username, credentials.password);
    await store.getProfile();
    await router.push('/');
  }
  catch (error) {
    console.error(error);
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 850px;
  min-width: 500px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
}

.title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  color: #00bfff;
}

.title::before {
  width: 18px;
  height: 18px;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #00bfff;
}

.message,
.signin {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.7);
}

.signin {
  text-align: center;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.signin a {
  color: #00bfff;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  background-color: #333;
  color: #fff;
  width: 100%;
  padding: 20px 05px 05px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 10px;
  top: -5px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,
.form label .input:valid + span {
  color: #00bfff;
  top: 0px;
  font-size: 0.7em;
  font-weight: 600;
}

.input {
  font-size: medium;
}

.submit {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
  background-color: #00bfff;
}

.submit:hover {
  background-color: #00bfff96;
}
</style>
