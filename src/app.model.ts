import { AddTaskDto, TExplainTask } from './app.dto';
import { EInnerState, EMainState, ESide, EStock } from './app.enum';

type TStateObject = {
    fib: {
        '0.00': number;
        '0.35': number;
        '0.62': number;
        '0.85': number;
        '1.00': number;
        '1.43': number;
        '1.80': number;
    };
    cancel: {
        price: number;
        time: Date;
    };
    fundAmount: number;
    enter: {
        price: number;
        size: number;
    };
    take: {
        price: number;
        size: number;
    };
    stop: {
        price: number;
        size: number;
    };
    state: {
        main: EMainState;
        inner: EInnerState;
    };
};

type TOrdersConfig = {
    fundAmount: number;
    cancelPrice: number;
    cancelTime: Date;
};

export class Task {
    private static lastId: number = 0;

    private readonly id: number;
    private readonly stock: EStock;
    private readonly long: TStateObject = null;
    private readonly short: TStateObject = null;

    constructor(config: AddTaskDto) {
        this.id = Task.lastId++;
        this.stock = config.stock;

        if (config.longFib0) {
            this.calcFib(this.long, config.longFib0, config.longFib1);
            this.calcOrders(this.long, {
                fundAmount: config.longFundAmount,
                cancelPrice: config.longCancelPrice,
                cancelTime: config.longCancelTime,
            });
        }

        if (config.shortFib0) {
            this.calcFib(this.short, config.shortFib0, config.shortFib1);
            this.calcOrders(this.short, {
                fundAmount: config.shortFundAmount,
                cancelPrice: config.shortCancelPrice,
                cancelTime: config.shortCancelTime,
            });
        }
    }

    move(side: ESide, fib1: number): void {
        // TODO -
    }

    explain(): TExplainTask {
        return {
            id: this.id,
            stock: this.stock,
            long: this.long,
            short: this.short,
        };
    }

    private calcFib(state: TStateObject, fib0: number, fib1: number): void {
        state.fib['0.00'] = fib0;
        state.fib['1.00'] = fib1;

        // TODO -
    }

    private calcOrders(state: TStateObject, ordersConfig: TOrdersConfig): void {
        state.fundAmount = ordersConfig.fundAmount;
        state.cancel.price = ordersConfig.cancelPrice;
        state.cancel.time = ordersConfig.cancelTime;

        // TODO -
    }
}
