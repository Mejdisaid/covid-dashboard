import axios from 'axios' ; 
const url  = 'https://cors-anywhere.herokuapp.com/https://www.data.gouv.fr/fr/datasets/r/a7596877-d7c3-4da6-99c1-2f52d418e881';

export const fetchData = async () => {
    try{
        const {data : {GlobalData, PaysData }} = await axios.get(url) ;

        return {GlobalData, PaysData } ;

    }catch (error){

    }
}