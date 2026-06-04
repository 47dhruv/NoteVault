
import { createContext,useContext } from "react";

export const NoteApp=createContext({
 notes:[{
    title:"title",
    id:1,
    noteMsg:"i write What i think"
 },
 ],
   createnote:()=>{},
   deletenote:()=>{}

})

export const NoteProvider =NoteApp.Provider

export const usenoteApp=()=>{
    return useContext(NoteApp

    )
}