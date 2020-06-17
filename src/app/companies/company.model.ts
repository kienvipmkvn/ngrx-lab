import { Product } from '../shared/product.model';

export class Company {
    id: number
    name: string;
    numberofEmployee: number;
    address: string;
    imgPath: string;
    establishmentDay: Date;
    products: Product[]

    constructor(id: number, name: string, noe: number, address: string, imgPath:string, esDay:Date, products: Product[]){
        this.id = id;
        this.name=name;
        this.numberofEmployee = noe;
        this.address = address;
        this.imgPath = imgPath;
        this.establishmentDay = esDay;
        this.products = products;
    }
  }
  