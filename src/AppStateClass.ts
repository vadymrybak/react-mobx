import {observable, computed, action} from 'mobx';
import Bird from './Bird';

import { from, Observable, forkJoin } from 'rxjs';
import {  retry, retryWhen, flatMap, delay,map,catchError } from 'rxjs/operators';
import { interval, of, throwError  } from 'rxjs';

import FetchObservable from './FetchObservable';


export default  class AppState {
    public static getSingleData(): Observable<any> {
        return FetchObservable.getObservable("https://jsonplaceholder.typicode.com/todos/").pipe(
            delay(1500)
        );
    }

    @observable public timer: number = 0;
    @observable private birds: Bird[] = [];
    @observable private dummyData: any[] = [];
    
    

    constructor() {
        for (let index = 0; index < 10; index++) {
            const b = new Bird("Bird #"+index, 1, "Color"+index);
            this.birds.push(b);
        }
    }

    

    public resetTimer() {
        this.timer = 0;
    }

    public get dummy() {
        return this.dummyData;
    }

    /**
     * Sets dummy data
     * @param x Array of any data
     */
    public set dummy (x:any[]) {
        this.dummyData = x;
    }

    @action 
    public addDummy(x:any){
        this.dummyData.push(x);
    }

    @computed 
    public get getBirds(): Bird[] {
        return this.birds;
    }

    @action
    public addBird = (bird: Bird) => {
        this.birds.push(bird);
    };

    @action 
    public removeAllBirds = () => {
        this.birds = [];
    };

    @action
    public removeOnlyBlue = () => {
        const notBlue = this.birds.filter( bird => bird.color !== 'BLUE');
        this.birds = notBlue;
    };

    @computed // derived state from existing observables
    public get birdCount() {
        return this.birds.length;
    }

    // normal method that calcuates based on snapshot of state store
    public get timestamp () {
        return this.birds.length + (new Date()).getTime();
    }
}

export interface IMobxProps {
    readonly main? : AppState
}