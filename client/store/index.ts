interface State {
    name: string, 
    maxComic: number,
}

export const state: () => State = () => {
    return {
        name: 'The Boswell Monastery',
        maxComic: 1,
    };
};

export const mutations = {
    setMax(state:State, newMax:number) {
        state.maxComic = newMax;
    }
}