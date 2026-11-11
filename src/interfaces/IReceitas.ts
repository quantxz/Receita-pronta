export interface Ingredientes {
    id: number;
    nome: string;
    quantia: string;
}

export interface IReceita {
    id: number;
    nome: string;
    ingredients: Ingredientes[];
    prepareMode: string;
}