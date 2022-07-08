
import {createStore} from 'redux';

const counterReducer=(state={data:[]},action)=>{
    if(action.type==='submit'){
        return {
            data:action.payload
        }
    }
    if(action.type==='create'){
        return {
            data:action.payload
        }
    }
    return state;
}

const store=createStore(counterReducer);

export default store;