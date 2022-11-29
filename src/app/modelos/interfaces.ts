import { Data } from "@angular/router";

export interface IBook {
    id?: string;
    titulo: string;
    categoria: string;
    autor: string;
    isbn: string;
    foto?: string;
}

export interface IEmprestimo {
    id?: string;
    leitor: string;
    email: string;
    telefone: string;
    status: string;
    dataEmprestimo: string;
    livroId: string;
    livroCapa: string;
    livroTitulo: string;
}
