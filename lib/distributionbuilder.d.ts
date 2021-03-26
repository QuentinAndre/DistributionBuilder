/**
 * Created by Quentin André on 07/10/2016.
 */
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
    addTotals?: boolean;
    toggleGridClick?: boolean;
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
declare type ValidRenderOrder = "buttons-grid-labels" | "grid-labels-buttons" | "labels-grid-buttons" | "labels-buttons-grid" | "grid-buttons-labels" | "buttons-labels-grid";
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
    toggleGridClick: Boolean;
    addTotals: Boolean;
    constructor(o: InitConfigObject);
    render(target: string, order: ValidRenderOrder, resize: boolean): void;
    labelize(o: LabelizeConfigObject): void;
    isComplete(): boolean;
    getRemainingBalls(): number;
    getDistribution(): Array<number>;
    setDistribution(dist: Array<number>): void;
    _setLabels(labels: Array<string>): void;
    _buttonActionCreator(action: ValidButtonAction): Function;
    _gridActionCreator(row: number): Function;
    _createGrid($target: JQuery<HTMLElement>): JQuery<HTMLElement>;
    _createButtons($target: JQuery<HTMLElement>): JQuery<HTMLElement>;
    _createLabels($target: JQuery<HTMLElement>): JQuery<HTMLElement>;
    _createTotals($target: JQuery<HTMLElement>): JQuery<HTMLElement>;
    _updateTotals(): void;
}
export default DistributionBuilder;
