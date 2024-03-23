export const getAllPokemon=(url)=>{
    //約束するプロミスメソッド
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((res)=>res.json())
        .then((date)=>resolve(date));
    })
};

export const getPokemon=(url)=>{
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((res)=>res.json())
        .then((date)=>{
            console.log(date);
            resolve(date);
        });
    });
};