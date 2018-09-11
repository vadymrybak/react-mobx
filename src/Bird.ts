import {observable, computed, action} from 'mobx';
import {v4 as uuid} from 'uuid';



export default class Bird {
    @observable private _id: string;
    @observable private _name: string;
    @observable private _age: number;   
    @observable private _color: string;

    constructor(name: string, age: number, color: string){
        this._name = name;
        this._age = Math.floor((Math.random() * 10) + 1);
        this._color = color;
        this._id = uuid();
    }

    @action
    public changeColorNAge(color:string, age:number){
        this.changeColor(color);
        // throw new Error("xxxxxx");
        this.age= (age);
    }

    @action
    public changeColor(color: string){
        this._color = color;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }

    public get color(): string {
        return this._color;
    }
}