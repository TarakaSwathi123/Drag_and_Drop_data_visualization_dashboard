import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {Layout} from 'react-grid-layout'

interface LayoutState {
    layouts: {[key:string]:Layout[]};
    components:string[]
}

const initialState:LayoutState = {
    layouts:{
        lg: [
          { i: 'table', x: 0, y: 0, w: 6, h: 4 },
          { i: 'graph', x: 6, y: 0, w: 6, h: 4 },
          { i: 'summary', x: 0, y: 4, w: 12, h: 2 },
        ],
        md: [
          { i: 'table', x: 0, y: 0, w: 5, h: 4 },
          { i: 'graph', x: 5, y: 0, w: 5, h: 4 },
          { i: 'summary', x: 0, y: 4, w: 10, h: 2 },
        ],
        sm: [
          { i: 'table', x: 0, y: 0, w: 6, h: 4 },
          { i: 'graph', x: 0, y: 4, w: 6, h: 4 },
          { i: 'summary', x: 0, y: 8, w: 6, h: 2 },
        ],
      },
    components:['table','graph','summary']
}

const layoutSlice = createSlice({
    name:'layout',
    initialState,
    reducers:{
        setLayouts:(state,action:PayloadAction<{[key:string]:Layout[]}>)=>{
            state.layouts = action.payload
        },
        addComponent:(state,action:PayloadAction<string>)=>{
            state.components.push(action.payload)
        },
        removeComponent:(state,action:PayloadAction<string>)=>{
            state.components = state.components.filter(item=>item!==action.payload)
        }
    }
})

export const {setLayouts,addComponent,removeComponent} = layoutSlice.actions;
export default layoutSlice.reducer