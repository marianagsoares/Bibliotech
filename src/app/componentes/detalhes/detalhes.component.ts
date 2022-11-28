import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBook } from 'src/app/modelos/interfaces';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IBook
  ) { };

  ngOnInit(): void {
  }

}
