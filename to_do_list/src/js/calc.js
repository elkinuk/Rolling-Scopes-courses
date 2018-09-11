export default class Calc{
    static getID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
}
