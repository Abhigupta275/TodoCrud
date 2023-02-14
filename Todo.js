import React, { useEffect, useState } from "react";
import './todo.css'
const Todo = () => {

    //to get data from localstorage
    const getLocalItems = () => {
        let list = localStorage.getItem('lists');
        console.log(list);

        if (list) {
            return JSON.parse(localStorage.getItem('lists'));
        } else {
            return [];
        }
    }


    const [input, setInput] = useState('')
    const [items, setItems] = useState(getLocalItems())
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null)

    const addItem = () => {
        if (!input) {
            alert('please fill the data')
        } else if (input && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: input }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInput('')
            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: input }
            setItems([...items, allInputData])
            setInput('')
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });
        setItems(updatedItems)
    }

    //for edit item 
    //1. get the id and name of the data which user clicked to ediit
    //2. set the toggle mode to change submitbutton into edit button
    //3. now update the value of the setInput with the new updated value to edit;
    //4. to pass the current element id to new state  variable for referance

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        setToggleSubmit(false);
        setInput(newEditItem.name)
        setIsEditItem(id);
    }

    const removeAll = () => {
        setItems([])
    }

    //add data to Local storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="input-field">
                <input className="form-control mt-5" type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                {
                    toggleSubmit ? <button type="button" className="btn btn-primary mt-5" onClick={addItem} >Add Items</button> :
                        <button type="button" className="btn btn-primary mt-5" onClick={addItem} >Update Item</button>
                }

                <button type="button" className="btn btn-success mt-5" onClick={removeAll}>Remove All</button>
            </div>
            <div className="showItems">
                {
                    items.map((elem) => {
                        return (
                            <div className="each-item" key={elem.id}>
                                <h3>{elem.name}</h3>
                                <button title="Delete Item" onClick={() => deleteItem(elem.id)} className="btn btn-danger">Delete</button>
                                <button onClick={() => editItem(elem.id)} className="btn btn-success">Edit</button>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Todo;
