export interface IBook {
    id?: string;
    titulo: string;
    categoria: string;
    autor: string;
    ISBN: string;
    foto?: string;
}

export interface IEmprestimo {
    id?: string;
    leitor: string;
    email: string;
    telefone: string;
    status: string;
    livro: IBook;
    foto?: string;
}

