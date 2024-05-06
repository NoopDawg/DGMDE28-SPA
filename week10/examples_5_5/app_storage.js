//storage


function StorageDemo()
{
    const data = {
        name:"Sam",
        id: 101,
        title:"Manager"
    }
    
    function store()
    {
        localStorage.setItem('p2', JSON.stringify(data));
        console.log("In store")
    }
    
    function get()
    {
        var s = localStorage.getItem('p2');
        console.log("In get, data is " + s)
    }
    
    function changeName()
    {
        var s = localStorage.getItem('p2');
        var p1= JSON.parse(s);
        p1.name = "Sally";
        localStorage.setItem('p2', JSON.stringify(p1));
        console.log("Name changed")
    }
    
    function show()
    {
        var s = localStorage.getItem('p2');
        console.log(s)
    }
    
    return (
        <>
        <button onClick={()=>store()}>store</button> &nbsp; 
        <button onClick={()=>get()}>get</button> &nbsp; 
        <button onClick={()=>changeName()}>new name</button> &nbsp; 
        <button onClick={()=>show()}>show</button>
        </>
    )
}


export function MyApp()
{
    return (
            <>
            <StorageDemo />
            </>
        )
}