import {useTitle} from "./useTitle";
import {useState} from "react"


function Title()
{
    var [title,tbox] = useTitle();


    return (
        <>
        <h1>{title}</h1>
        Here is additional content.
        <br />
        {tbox}}
        </>
    )
}


export function MyApp()
{
    return (
            <>
            <Title />
            </>
        )
    }