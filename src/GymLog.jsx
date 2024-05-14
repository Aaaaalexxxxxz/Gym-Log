import React, { useRef, useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { 
  getFirestore, collection, getDocs
} from 'firebase/firestore'
import { app, auth, db } from './firebase-config'




function GymLog() {
    const currentDate = new Date().toLocaleDateString()
    const unit = "lb"
    const [Exercises, setExercises] = useState([{ name: "Bench Press", weight: 135, reps: 8, sets: 5}]);

    const dragExercise = useRef(0)
    const draggedOverExercise = useRef(0)

    const [newExercise, setNewExercise] = useState({ name: "", weight: null , reps: null , sets: null})

    const [exercisehist, setExerciseHist] = useState([])
    const historyCollectionRef = collection(db, "History")
    {/*useEffect(() => {
        const getExerciseHist = async () => {
            //read from data
            //set exercisehist
            try {
                const data = await getDocs(historyCollectionRef)
                console.log(data)
            } catch(error) {
                console.log(error)
            }

        }
    })*/}
    
    const handleInputExercise = (event) => {
        setNewExercise({ ... newExercise, name: event.target.value });
    }

    const handleInputWeight = (event) => {
        setNewExercise({ ... newExercise, weight:event.target.value});
    }

    const handleInputRep = (event) => {
        setNewExercise({ ... newExercise, reps: event.target.value});
    }

    const handleInputSet = (event) => {
        setNewExercise({ ... newExercise, sets: event.target.value})
    }

    const addExercise = () => {
        if(newExercise.name && newExercise.weight >= 0 && newExercise.reps > 0){
            setExercises([... Exercises, newExercise])
            setNewExercise({ name: "", weight: null, reps: null })
        }
    }

    function deleteExercise(index){
        const updatedExercises = Exercises.filter((_, i) => i !== index)
        setExercises(updatedExercises) 
    }

    function handleSort(){
        const exerciseClone = [...Exercises]
        const temp = exerciseClone[dragExercise.current]
        exerciseClone[dragExercise.current] = exerciseClone[draggedOverExercise.current]
        exerciseClone[draggedOverExercise.current] = temp
        setExercises(exerciseClone)
    }

    return(
    <div>
        <h1>Gym Log for {currentDate}</h1>
        <form className="addexercise">
            <input
                type="text"
                placeholder="Exercise"
                value={newExercise.name}
                onChange={handleInputExercise}
            />
            <input
                type="number"
                placeholder= "Weight"
                value={newExercise.weight}
                onChange={handleInputWeight}    
            />
            <input
                type="number"
                placeholder="Reps"
                value={newExercise.reps}
                onChange={handleInputRep}
            />
            <input
                type="number"
                placeholder="Sets"
                value={newExercise.sets}
                onChange={handleInputSet}
            />
            <button
                className="add-button"
                onClick={() => addExercise()}
            >ADD</button>
        </form>
        <div>
            {Exercises.map((exercise, index) => (
                <div className="exercises" 
                draggable
                onDragStart={() => (dragExercise.current = index)}
                onDragEnter={() => (draggedOverExercise.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                >
                    <div className="listitem">{exercise.name} - {exercise.weight} {unit} - {exercise.reps} reps - {exercise.sets} sets
                    <button
                        className="delete-button"
                        onClick={() => deleteExercise(index)}>Delete</button></div>
                </div>))}
        </div>
    </div>
    )
}


export default GymLog