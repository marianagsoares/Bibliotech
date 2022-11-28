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
    livro: string;
    foto?: string;
    dataEmprestimo: Date;
}

export interface Controle {
    id?: string;
    leitor: string;
    livro: string;
    dataEmprestimo: string;
    status: string;
    capa: string;
}

