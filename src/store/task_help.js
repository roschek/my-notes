export default class User {
    constructor(title, description, whatIsIt, editing, completed, tags, user = null, id = null) {

        this.title = title
        this.description = description
        this.whatIsIt = whatIsIt
        this.editing = editing
        this.completed = completed
        this.tags = tags
        this.user = user
        this.id = id
    }
}