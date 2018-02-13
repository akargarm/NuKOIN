export interface IPrice {
    cryptoName: string;
    valUsd: number;
    valEur: number;
}

export class Price implements IPrice {
    public cryptoName: string;
    public valUsd: number;
    public valEur: number;

    constructor(cryptoName: string, valUsd: number, valEur: number) {
        this.cryptoName = cryptoName;
        this.valUsd = valUsd;
        this.valEur = valEur;
    }
}
