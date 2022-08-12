export enum EStock {
    BITMEX = 'BITMEX',
    DERIBIT = 'DERIBIT',
}

export enum ELevel {
    BLUE = 'Blue 0.62',
    PURPLE = 'Purple 0.85',
}

export class Task {
    stock: EStock;

    longFib_0: number;
    longFib_0_35: number;
    longFib_0_62: number;
    longFib_0_85: number;
    longFib_1: number;
    longFib_1_20: number;
    longFib_1_43: number;
    longFib_1_85: number;

    longEnterLevel: ELevel;
    longCancelPrice: number;
    longCancelTime: Date;
    longFundAmount: number;

    shortFib_0: number;
    shortFib_0_35: number;
    shortFib_0_62: number;
    shortFib_0_85: number;
    shortFib_1: number;
    shortFib_1_20: number;
    shortFib_1_43: number;
    shortFib_1_85: number;

    shortEnterLevel: ELevel;
    shortCancelPrice: number;
    shortCancelTime: Date;
    shortFundAmount: number;
}
