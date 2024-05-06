//custom hook
import {useState} from "react"

export const useTitle= () =>
{
    const [title, setTitle] = useState("Welcome");
    var tbox = <>
        New Title&nbsp; 
        <input type ='text' name='title' onChange={(e)=>setTitle(e.target.value)} />
        </>
    return [title, tbox];    
}
