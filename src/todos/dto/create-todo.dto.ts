//Décrit les nouveau todo entrant 
export class CreateTodoDto {
    readonly id: number;
    readonly title: string;
    readonly description?: string;
    readonly done: boolean;
}