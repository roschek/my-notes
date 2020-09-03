<template>
    <div>
        <section>
            
             <aside class="radio-list">
             <div>
                 <label for="typeFilm" class="radio-label">Фильм</label>
             <input type="radio" class="what-is-it" id="typeFilm" value="Фильм" v-model="noteType">
             </div>
             <div>
              <label for="typeBook" class="radio-label">Книжка</label>   
             <input type="radio" class="what-is-it" id="typeBook" value="Книга" v-model="noteType">
             
             </div>
             <div>
             <label for="typeNote" class="radio-label">Заметка</label>    
             <input type="radio" class="what-is-it" id="typeNote" value="Заметка" v-model="noteType">
             
             </div>
             <div>
               <label for="typeTodo" class="radio-label" >Задача</label>  
             <input type="radio" class="what-is-it" id="typeTodo" value="Задача" v-model="noteType">
              
                </div>
                   </aside>
             <input class="input-task" type="text" placeholder="Ведите название" v-model="taskTitle">
             <textarea class="input-textarea" type="text" v-model="taskDescription" @keyup.enter="newTask"/>
        </section>

         <div class="ui-tag__wrapper open-input-tags">
            <div class="ui-tag open-input-bttn"  @click="tagInputShow = !tagInputShow">
              <span class="tag-title">Добавить тэг</span>
              <span class="button-close" :class="{active: !tagInputShow}"></span>
            </div>
            <div>
             <input class="input-task input-task-tag" type="text " placeholder="Добавить тег" v-if="tagInputShow" v-model="tagTitle" @keyup.enter="addTag">
             <button class="button--round button--small button button-primary"  v-if="tagInputShow" @click="addTag">Добавить тэг</button>
            </div>
        </div>
        <div class="ui-tag__wrapper ">
            <div class="ui-tag show-tags" v-for="tag in tags" :key="tag.title"   :class="{active: tag.use}">
              <span class="tag-title">{{tag.title}}</span>
              <span class="button-close" @click="deleteTag(tag)"></span>
           </div>
        
        </div>
      <button class="button--round button--small button button-primary button-send" @click="newTask">Отправить</button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tagInputShow: false,
                taskTitle:'',
                taskDescription:'',
                noteType:'',
                tags:[],
                tagTitle:''                
            }
        },
        methods:{
            addTag(){
                if(this.tagTitle === ''){
                    return
                }
              this.tags.push({
                  title:this.tagTitle,
                  use: false
              })
              this.tagTitle='';
              this.tagInputShow = !this.tagInputShow
              
            },
             newTask(){
                if(this.taskTitle === ''){
                    return
                }
               const task = {
                    id: Date.now(),
                    title: this.taskTitle,
                    description:this.taskDescription,
                    whatIsIt:this.noteType,
                    completed:false,
                    editing:false,
                    tags: this.tags
                }
                this.$store.dispatch('newTask', task)
                this.taskTitle = ''
                this.taskDescription = ''
                
            },
            deleteTag(tag){
                console.log(tag.title)
                this.tags = this.tags.filter(elem => elem.title !== elem.title )
            },
            addClickUsed(tag){
                tag.use = !tag.use
                if(tag.use){
                    this.tags.push({
                        title: tag.title})
                }
               
                else 
                 console.log(this.tag)
                this.tags =this.tags.filter(c => c.tag !== tag )
            }
        }

    }
</script>

<style lang="stylus" scoped>

.task-item
    margin-bottom 20px
    &last-child
      margin-bottom 0
.task-info
    display flex
    flex-direction column
    justify-content space-between
    align-items center
.cross
    align-self flex-end

.ui-checkbox
    margin-top  20px
.ui-title-1
    margin-bottom 0
.ui-title-2
    align-self flex-start
.ui-text-regular
    align-self flex-start
.input-task
    max-width 60%
    border none
    border-bottom  1px solid lavender
    margin-left 10%
    
.input-task:focus
    border-bottom 1px solid #26de81
.input-textarea
    max-width 500px
    margin 0 auto 0 10%
.input-textarea:focus
    border 1px solid #26de81

.radio-list
    display flex
    flex-direction row
    justify-content space-around
    align-items center
    padding 15px
.ui-tag__wrapper
    display flex
    flex-direction row
    justify-content flex-start
    max-width 800px
    margin-left 10%
.button-close
    width 20px
    height 20px
.button-close
    &.active
        transform: rotate(45deg)
.show-tags 
    &.active
        background-color blue
        color lavender
.open-input-tags
    display flex
    flex-direction column
    margin-bottom 20px
.open-input-bttn
    max-width 200px
    margin-bottom 20px
.input-task-tag
    margin-left 0
.button-send
    margin 30px auto 0 20%

</style>