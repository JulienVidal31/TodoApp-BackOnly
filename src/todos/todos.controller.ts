import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

// va écouter localhost:3000/todos
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {} //on dmd a notre Injecteur de nous fournir une instance de todoService
    
    @Get()
    findAll(): Todo[] {  //méthode findAll qui retourne un tableau de qq chose
        return this.todosService.findAll();
    }

    // POST - test avec Postman
    @Post()
    createTodo(@Body() newTodo: CreateTodoDto) { //grace au décorateur Body on récupère le body qui aurait été envoyé vers notre server, de type CreateTodoDto
        this.todosService.create(newTodo);
    }
    
    // http://localhost:3000/todos/2
    @Get(':id') //":" pour un résultat dynamique (=un n° d'id), si juste "id" -> comme si écoute sur localhost:3000/todos/id alors que l'on veut par ex localhost:3000/todos/2
    findOne(@Param('id') id: string) { //grace au décorateur Param on récup le paramètre de id que l'on souhaite et le donne a la variable id de type string (car type string dans l'URL)
        // console.log('id :', id);
        return this.todosService.findOne(id)
    }

    //UPDATE
    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {
        return this.todosService.update(id, todo)
    }

    //DELETE
    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        return this.todosService.delete(id)
    }

}
 