import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  Operation = Operation
  current: string = ""
  old: string = ""
  result: string = ""
  action?: Operation


  numberClick(a: string) {
    if (a == "." && this.current.includes(".")) {
      return
    }
    this.current += a

  }

  oper(currentAction: Operation) {
    switch (this.action) {
      case Operation.add:
        this.old = (Number(this.old) + Number(this.current)).toString();
        break;
      case Operation.minus:
        this.old = (Number(this.old) - Number(this.current)).toString();
        break;
      case Operation.divide:
        this.old = (Number(this.old) / Number(this.current)).toString();
        break;
      case Operation.multiply:
        this.old = (Number(this.old) * Number(this.current)).toString();
        break
      default:
        this.old = this.current
    }
    if (currentAction === Operation.calc) {
      this.action = undefined
      this.current = this.old
      this.old = ""
    } else {
      this.action = currentAction
      this.current = ""
    }
  }

  backSpase() {

    if (this.current.length >= 1) {
      this.current = this.current.substring(0, this.current.length - 1)
    }

  }
  clear() {
    this.old = ""
    this.action = undefined
    this.current = ""
  }

  numbers = "01234567890."

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.numbers.includes(event.key))
      this.numberClick(event.key)

    switch (event.key) {
      case "+":
        this.oper(Operation.add)
        break
      case "-":
        this.oper(Operation.minus)
        break
      case "*":
        this.oper(Operation.multiply)
        break;
      case "/":
        this.oper(Operation.divide)
        break
      case "=":
        this.oper(Operation.calc)
        break
    }

  }

}

export enum Operation {
  add = "+",
  minus = "-",
  multiply = "*",
  divide = "/",
  calc = "="
}