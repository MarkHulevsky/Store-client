import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-transaction-succeeded-dialog',
  templateUrl: './transaction-succeeded-dialog.component.html',
  styleUrls: ['./transaction-succeeded-dialog.component.css']
})
export class TransactionSucceededDialogComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<CartDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  public continue(): void {
    this._dialogRef.close();
  }
}
