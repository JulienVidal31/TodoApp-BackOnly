import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    todos: Todo[] = [
        {
            id : 1,
            title : 'Todo1',
            description : 'achat cahier',
            done : true
        },
        {
            id : 2,
            title : 'Todo2',
            description : 'achat pain',
            done : false
        },
    ]

    findAll(): Todo[] { //on peut coder que un tableau de Todo est renvoyé grace a la création de l'interface de typage todo.interface
        return this.todos;
    }

    create(todo: CreateTodoDto) {
        this.todos = [...this.todos, todo]; //"..." permet de récupérer tout ce qu'il y avait dans todos et d'y ajouter le nouveau todo
    }

    findOne(id: string) {
        return this.todos.find(todo => todo.id === Number(id)) //renvoie le todo qd l'id d'un des todo de la liste = l'id visé
    }

    update(id: string, todo: Todo) {
        //récup todo a mettre à jour
        const todoToUpdate = this.todos.find(t => t.id === +id) //+id = Number(id);
        if(!todoToUpdate)  { //si on netrouve pas d'id (qu'il n'existe pas)
            return new NotFoundException(`l'id que tu veux mettre à jour n'existe pas`)
        }
        //appliquer les modif granulairement - permet la modif d'une propriété seulement, ou plusieurs (en json) - on test si la propriété envoyée existe dans ce que l'on veut passer
        if (todo.hasOwnProperty('done')) { //test si le todo testé a la propriété done, utiliser hasOwnProperty ici car si le todo.done = true on rentre tjrs dans la boucle (car boolean)
            todoToUpdate.done = todo.done
        }
        if (todo.title) { //test si le todo testé a la propriété title
            todoToUpdate.title = todo.title
        }
        if (todo.description) { //test si le todo testé a la propriété title
            todoToUpdate.description = todo.description
        }
        const updtatedTodos = this.todos.map(t => t.id === +id ? todoToUpdate : t) //map renvoie un nouveau tableau - on teste si l'id du todo sur lequel on veut faire la modif = un des id des todos, si c'est le cas on remplace sinon on garde ce qu'il y a de base
        this.todos = updtatedTodos
        return { updtatedTodos:1, todo: todoToUpdate } //réponse personnalisé : 1 élément modifié / description todo modifié)
    }

    delete(id: string) {
        const nbOfTodosBeforeDelete = this.todos.length;
        console.log(nbOfTodosBeforeDelete)
        this.todos = [...this.todos.filter(t => t.id !== +id)] // on ne garde que les todos dont l'id sont different de celui qu'on veut supprimer
        if (this.todos.length < nbOfTodosBeforeDelete) { //confirme que suppr a eu lieu
            return { deletedTodos:1, nbTodos: this.todos.length }
        } else {
            return { deletedTodos:0, nbTodos: this.todos.length }
        }
    }
}
