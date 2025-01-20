export type TBruteforceItem = {
    numTry: number,
    isBun: boolean,
    expires: number
}

class BruteforceList {
    private list: { [key: string]: TBruteforceItem } = {};
    private _length = 0;
    constructor() { }

    get length(){
        return this._length;
    }

    private add(key: string) {
        if (this._length > 3000) {
            this._length = 0;
            this.list = {};
        }
        this.list[key] = {
            numTry: 1,
            expires: 0,
            isBun: false,
        }
        this._length++;
    }

    detect(key: string) {
        if (this.list.hasOwnProperty(key)) {
            console.log('numTry = ', this.list[key].numTry);
            if (this.list[key].numTry < 4) {
                this.list[key].numTry++;
                
            } else {
                if (this.list[key].expires < Date.now()) {
                    if(this.list[key].isBun){
                        this.list[key].isBun = false;
                        this.list[key].numTry = 0;
                        this.list[key].expires = 0;
                    }else{
                        this.setExires(key);
                        return false;
                    }
                    
                    //return true;
                } else {
                    //console.log('set expires');
                    //this.setExires(key);
                    return false;
                }
            }
        }else{
            this.add(key);
            //return true;
        }
        return true;
    }

    private setExires(key:string){
        this.list[key].isBun = true;
        this.list[key].expires = Date.now() + 3 * 60 * 1000;
    }
}
const bruteforceList = new BruteforceList(); 

export default bruteforceList;