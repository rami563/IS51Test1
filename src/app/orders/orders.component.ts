import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

export interface IOrder {
  pid?: string;
  image?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<IOrder> = [];
  errorMessage: string;
  confirmMessage: string;
  name: string;

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {
    
  }

  async ngOnInit() {

  }

  loadSavedItems(){
    this.orders = [{
      "pid": "1",
      "image":"assets/sm_android.jpeg",
      "description": "Android",
      "price": 150.00,
      "quantity": 2
    }, {
      "pid": "2",
      "image":"assets/sm_iphone.jpeg",
      "description": "IPhone",
      "price": 200.00,
      "quantity": 1
    }, {
      "pid": "3",
      "image":"assets/sm_windows.jpeg",
      "description": "Windows Phone",
      "price": 110.00,
      "quantity": 2
    }]
  }

  
  // Calculate total and perform input validation
  calculateTotal(){
    const total = this.orders.reduce((acc: number, item: IOrder, i: number, a:Array<IOrder>) => {
      acc += item.quantity * item.price;
      return acc;
    }, 0);
    const taxAmount = total *.15;
    const subTotal = total-taxAmount;
    this.validate(this.name, total, taxAmount, subTotal, )
  }

  validate(name:string, total: number, taxAmount: number, subTotal: number){

    if(!total){
      this.errorMessage = 'Must Enter numbers for all prices and quantities'
      this.showMessage('error-modal');
    }
    else if(!name){
        this.errorMessage = 'Must enter a name';
        this.showMessage('error-modal');
    }

    else if(name.search(', ') == -1){
        this.errorMessage = 'Must use a comma and space to seperate last and first name';
        this.showMessage('error-modal');
      }
    
    else {
      let firstName = name.slice(name.indexOf(', ')+2,name.length);
      let lastName = name.slice(0,name.indexOf(','));
      this.confirmMessage = `Thank you for your order ${firstName} ${lastName}  your subtotal is ${subTotal} your tax is ${taxAmount} and your total is ${total}`
      this.showMessage('confirm-modal');
    }

  }

  showMessage(modalID: string) {
    this.flexModal.openDialog(modalID);
  }
  
  // Add items 'Android', 'IPhone' and 'Windows Phone' to list when corresponding button is clicked
  addItem(item: string){
    switch(item) {
      case'Android':
        this.orders.unshift({
          "pid": "1",
          "image":"assets/sm_android.jpeg",
          "description": "Android",
          "price": 150.00,
          "quantity": 2});
      break;
      case'IPhone':
      this.orders.unshift({
        "pid": "2",
        "image":"assets/sm_iphone.jpeg",
        "description": "IPhone",
        "price": 200.00,
        "quantity": 1});

      break;

      case'WindowsPhone':
      this.orders.unshift({
        "pid": "3",
        "image":"assets/sm_windows.jpeg",
        "description": "Windows Phone",
        "price": 110.00,
        "quantity": 2});

      break;
    }
  }

  // Clear the orders form
  clear(){
     this.orders.map((item: IOrder, i: number) => {
      Object.keys(item).map((key: string) => {
        if(key != 'image'){
          item[key] = null;
        }
        return item;
      })
    })
  }
  
  // delete line item (order) when delete button is click
  delete(index: number){
    this.orders.splice(index,1);
  }

}
