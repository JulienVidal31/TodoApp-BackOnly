export interface Todo {
    id: number;
    title: string;
    description?: string; //le ? veut dire que cette propriété est optionnelle
    done: boolean;
}