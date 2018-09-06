import "jquery";
import './distributionbuilder.css';
import "bootstrap-webpack!./bootstrap.config.js";
interface InitConfigObject {
    minVal?: number;
    maxVal?: number;
    nBalls?: number;
    nRows?: number;
    nBuckets?: number;
    onTouch?: Function;
    onChange?: Function;
}
interface LabelizeConfigObject {
    labels?: Array<number | string>;
    prefix?: string;
    suffix?: string;
}
declare global {
    interface JQuery {
        mousehold(timestart: number, timeout: number, callback: Function): any;
    }
}
declare type ValidRenderOrder = "buttons-grid-labels" | "grid-labels-buttons" | "labels-grid-buttons" | "-buttons-grid" | "grid-buttons-labels" | "buttons-labels-grid";
declare type ValidButtonAction = "increment" | "decrement";
declare class DistributionBuilder {
    min: number;
    max: number;
    nBalls: number;
    nRows: number;
    nBuckets: number;
    remainingBalls: number;
    distribution: Array<number>;
    _$target: JQuery<HTMLElement>;
    onTouch: Function;
    onChange: Function;
    constructor(o: InitConfigObject);
    render(target: string, order: ValidRenderOrder, r: boolean): void;
    labelize(o: LabelizeConfigObject): void;
    isComplete(): boolean;
    getRemainingBalls(): number;
    getDistribution(): number[];
    _setLabels(labels: Array<string>): void;
    _actionCreator(action: ValidButtonAction): Function;
    _createGrid($target: JQuery<HTMLElement>): JQuery<HTMLElement>;
    _createButtons($target: JQuery<HTMLElement>): JQuery<HTMLElement>;
    _createLabels($target: JQuery<HTMLElement>): JQuery<HTMLElement>;
}
export default DistributionBuilder;
