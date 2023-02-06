import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SingleToDo from "./SingleToDo"

export default function Input(props) {
    const [val, setVal] = React.useState("")
    const [todoObj, setToDoObj] = React.useState(JSON.parse(localStorage.getItem("toDoArr")) || [])
    const [selectedFilter, setSelectedFilter] = React.useState("all")


    // React.useState(JSON.parse(localStorage.getItem("toDoArr")) || [])

    React.useEffect(function () {
        localStorage.setItem("toDoArr", JSON.stringify(todoObj))
    }, [todoObj])

    function setValue(e) {
        setVal(e.target.value)
    }

    function addTodo(e) {
        if (val) {
            setToDoObj(preVal =>
                [...preVal, { value: val, isBulletClicked: false }])
            setVal("")
        }

    }

    function deleteItem(e) {
        setToDoObj(prevTodo => {
            let newArr = []
            for (let item of prevTodo) {
                if (item.value !== e.target.id) {
                    newArr.push(item)
                }
            }
            return newArr
        })
    }


    function taskCompleted(value) {
        setToDoObj(prevObj => {
            let newObj = []
            for (let obj of prevObj) {
                if (value === obj.value) {
                    newObj.push({ ...obj, isBulletClicked: !obj.isBulletClicked })
                } else {
                    newObj.push(obj)
                }
            }
            return newObj
        })
    }

    let valArr = todoObj.filter(el => !el.hidden).map((el, idx) => {
        return <SingleToDo
            key={idx}
            value={el.value}
            handleBullet={taskCompleted}
            bulletClicked={el.isBulletClicked}
            handleDelete={deleteItem}
        />
    })

    function showActive(e) {
        setSelectedFilter("active")
        setToDoObj(prevObj => prevObj.map(obj => {
            obj.hidden = obj.isBulletClicked
            return obj
        }))
    }

    function showComplete() {
        setSelectedFilter("complete")
        setToDoObj(prevObj => prevObj.map(obj => {
            obj.hidden = !obj.isBulletClicked
            return obj
        }))
    }
    function showAll() {
        setSelectedFilter("all")
        setToDoObj(prevObj => prevObj.map(obj => {
            obj.hidden = false
            return obj
        }))
    }

    const foregroundColor = props.darkMode ? "white" : "#4d4c4c";

    return (
        <div className={props.darkMode ? "create-list dark" : "create-list light"}>
            <div className="input">
                <input className={props.darkMode ? "input-text dark" : "input-text light"}
                    onChange={setValue}
                    value={val}
                    type="text"
                    placeholder="Add todo" />
                <input className={props.darkMode ? "input-button dark" : "input-button light"}
                    onClick={addTodo}
                    type="button"
                    value="+" />
            </div>
            <ul className="list">
                {valArr}
            </ul>
            <div className={props.darkMode ? "filters dark-btn" : "filters light-btn"}>
                <p onClick={showAll}
                    style={{ color: selectedFilter === "all" ? "#4a4adf" : foregroundColor }}>
                    All
                </p>
                <p onClick={showActive}
                    style={{ color: selectedFilter === "active" ? "#4a4adf" : foregroundColor }}>
                    Active
                </p>
                <p onClick={showComplete}
                    style={{ color: selectedFilter === "complete" ? "#4a4adf" : foregroundColor }}>
                    Completed
                </p>
            </div>
        </div>
    )
}