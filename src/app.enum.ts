export enum EStock {
    BITMEX = 'BITMEX',
    DERIBIT = 'DERIBIT',
}

export enum ESide {
    LONG = 'LONG',
    SHORT = 'SHORT',
}

export enum EMainState {
    INITIAL = 'INITIAL',
    WAIT = 'WAIT',
    IN_POSITION = 'IN_POSITION',
    TAKE = 'TAKE',
    STOP = 'STOP',
    SAFE = 'SAFE',
    MANUAL_CANCEL = 'MANUAL_CANCEL',
    AUTO_CANCEL = 'AUTO_CANCEL',
}

// TODO -
export enum EInnerState {
    INITIAL = 'INITIAL',
}
