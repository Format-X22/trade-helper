import { AddTaskDto, TExplainTask } from './app.dto';
import { EInnerState, EMainState, ESide, EStock } from './app.enum';
import * as moment from 'moment';

type TStateObject = {
    fib: {
        f0_00: number;
        f0_35: number;
        f0_62: number;
        f0_85: number;
        f1_00: number;
        f1_43: number;
        f1_80: number;
    };
    order: {
        enter: {
            price: number;
            amount: number;
            isOpen: boolean;
        };
        take: {
            price: number;
            amount: number;
            isOpen: boolean;
        };
        stop: {
            price: number;
            amount: number;
            isOpen: boolean;
        };
        safe: {
            price: number;
            amount: number;
            isOpen: boolean;
        };
    };
    cancel: {
        price: number;
        time: Date | string;
    };
    state: {
        main: EMainState;
        inner: EInnerState;
    };
};

type TOrdersConfig = {
    cancelPrice: number;
    cancelTime: Date;
};

export class Task {
    private static lastId: number = 0;

    private readonly id: number;
    private readonly stock: EStock;
    private readonly fundAmount: number;
    private readonly long: TStateObject = null;
    private readonly short: TStateObject = null;

    constructor(config: AddTaskDto) {
        this.id = ++Task.lastId;
        this.stock = config.stock;
        this.fundAmount = config.fundAmount;

        if (config.longFib0) {
            this.long = this.makeInitialConfig();

            this.calcFib(this.long, config.longFib0, config.longFib1);
            this.calcOrders(this.long, {
                cancelPrice: config.longCancelPrice,
                cancelTime: config.longCancelTime,
            });
        } else {
            this.long = null;
        }

        if (config.shortFib0) {
            this.short = this.makeInitialConfig();

            this.calcFib(this.short, config.shortFib0, config.shortFib1);
            this.calcOrders(this.short, {
                cancelPrice: config.shortCancelPrice,
                cancelTime: config.shortCancelTime,
            });
        } else {
            this.short = null;
        }
    }

    move(side: ESide, fib1: number): void {
        // TODO -
    }

    explain(): TExplainTask {
        return {
            id: this.id,
            stock: this.stock,
            fundAmount: this.fundAmount,
            long: {
                ...this.long,
                cancel: {
                    price: this.long.cancel.price,
                    time: this.formatDate(this.long.cancel.time as Date),
                },
            },
            short: {
                ...this.short,
                cancel: {
                    price: this.short.cancel.price,
                    time: this.formatDate(this.long.cancel.time as Date),
                },
            },
        };
    }

    private calcFib(state: TStateObject, fib0: number, fib1: number): void {
        state.fib.f0_00 = fib0;
        state.fib.f1_00 = fib1;

        // TODO -
    }

    private calcOrders(state: TStateObject, ordersConfig: TOrdersConfig): void {
        state.cancel.price = ordersConfig.cancelPrice;
        state.cancel.time = ordersConfig.cancelTime;

        // TODO -
    }

    private makeInitialConfig(): TStateObject {
        return {
            fib: {
                f0_00: 0,
                f0_35: 0,
                f0_62: 0,
                f0_85: 0,
                f1_00: 0,
                f1_43: 0,
                f1_80: 0,
            },
            order: {
                enter: {
                    price: 0,
                    amount: 0,
                    isOpen: false,
                },
                take: {
                    price: 0,
                    amount: 0,
                    isOpen: false,
                },
                stop: {
                    price: 0,
                    amount: 0,
                    isOpen: false,
                },
                safe: {
                    price: 0,
                    amount: 0,
                    isOpen: false,
                },
            },
            cancel: {
                price: 0,
                time: null,
            },
            state: {
                main: EMainState.INITIAL,
                inner: EInnerState.INITIAL,
            },
        };
    }

    private formatDate(date: Date): string {
        if (date) {
            return moment(date).format('DD MMM HH:mm:ss');
        } else {
            return '';
        }
    }
}
