import axios from "axios";

const exercisesApi = axios.create({
    baseURL: "https://api.api-ninjas.com/v1/exercises",
    headers: { 'X-Api-Key': 'tookX5I5bY3cGvADxFQ9iw==tnYqrFUCi8YnLgep'},
    contentType: 'application/json',
});


export const getExercisesByMuscle = (muscle) => {
    return exercisesApi.get(`?type=strength&muscle=${muscle}`).then((res) => {
        return res.data
      });
}
