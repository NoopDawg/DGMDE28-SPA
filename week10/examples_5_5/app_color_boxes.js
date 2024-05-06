import { useState, createContext, useContext } from "react";
const ColorContext = createContext();


function ColorBox(props)
{
    const color = useContext (ColorContext);
    var styles =
        {
            h:'100px',
            w:'200px',
            bc:color,
        }
    //console.log ({styles})
    return (
        <div style={
                {height: styles.h, width:styles.w, backgroundColor:styles.bc, color:'#fff'}
                }>
        <br />The color is {color}
        </div>
    )
}

function ColorPicker(props)
{
   const color = useContext (ColorContext);
   return (
       <>
        <input type='radio' name='color' value='#ff0000' onChange={props.changeHandler} 
          checked={color==='#ff0000'}   />Red
        <input type='radio' name='color' value='#008800' onChange={props.changeHandler} />Green
        <input type='radio' name='color' value='#0000ff' onChange={props.changeHandler} />Blue
       </>
    );
}


function ColorBoxes()
{
    var [color, setColor] = useState('#ff0000');
    return (
        <>
        <ColorContext.Provider value = {color}>
        <ColorPicker changeHandler={(e)=>setColor(e.target.value)} />
        <ColorBox />
        </ColorContext.Provider>
        </>
    )
}

export function MyApp()
{
    return (
            <div style={{"margin": "35px"}} >
            <ColorBoxes />
            </div>
        )
}