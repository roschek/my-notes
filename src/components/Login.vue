<template>
    <div>
      <section class="form">
          <h1 class="ui-title-1">Вход</h1>
          <form @submit.prevent="onSubmit">
              <div class="form-item" :class="{ errorInput: $v.email.$error }">
                <input  class="form-input" type="email" placeholder="введите е-мейл" v-model="email" :class="{error:$v.email.$error }" @change="$v.email.$touch()">
                <span class="error" v-if="!$v.email.required">Это обязательное поле</span>
                <span class="error" v-if="!$v.email.email">Введите корректный е-майл</span>
              </div> 
              
              <div class="form-item" :class="{ errorInput: $v.password.$error }" >
                <input type="password" placeholder="введите пароль" v-model="password" :class="{error:$v.password.$error }" @change="$v.password.$touch()">
                <span class="error" v-if="!$v.password.required">Введите пароль</span>
                <span class="error" v-if="!$v.password.minLength">Минимальная длинна 5 символов</span>
              </div>
              <button type="submit"  class="form__submit"><span v-if="loading">Регистрируюсь...</span><span v-else>Войти</span></button>
              <p class="typo__p" v-if="submitStatus === 'OK'">Спасибо, вы зарегистрированы</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Заполните поле корректно</p>
              <p class="typo__p" v-else>{{submitStatus}}</p>
          </form>
      </section>
    </div>
</template>

<script>
import { required, email,minLength} from 'vuelidate/lib/validators'
    export default {
        data(){
            return{
             email: '',
             password:'',
              submitStatus: null
            }
        },
        validations: {
            email:{
                required,
                email
            },
            password:{
                required,
                minLength: minLength(5)
            }

        },
        
        methods:{
            onSubmit() {
      
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
         const user = {
            email: this.email,
            password:this.password
        }
        this.$store.dispatch('loginUser', user)
        .then(() =>{
            console.log('LOGIN')
            this.submitStatus ='OK'
            this.$router.push('/')
        })
        .catch(err =>{
            this.submitStatus = err.message
        })
      
      }
      
    }
             
        },
        computed:{
        loading (){
            return this.$store.getters.loading
        }
    }
    }
</script>

<style lang="stylus" scoped>
.form
    display flex
    flex-direction column
    max-width 600px
    padding 30px
    margin 100px auto
    border 1px solid blue
    border-radius 20px

.form__submit
    background-color blue
    color lavender
    border-radius 10px
    transition .4s

.form__submit:hover
    color gray
.form-item
    .error
        display none 
    &.errorInput
       .error 
          display block  
              
input 
    &.error 
        border-color red
span 
    &.error
        position relative
        bottom 10px
        left 10px
        color red
</style>