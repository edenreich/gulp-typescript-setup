import { Dependency } from './Dependency';
import * as axios from 'axios';

export class App extends Dependency
{
    constructor()
    {
        super();
    }

    public getAxios()
    {
        return axios;
    }
}

(<any>window).App = App;