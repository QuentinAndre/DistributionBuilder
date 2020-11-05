/**
 * Created by Quentin André on 07/10/2016.
 */
import "jquery";
import './distributionbuilder.css';
import "bootstrap-webpack!./bootstrap.config.js";
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';
interface InitConfigObject {
    minVal?: number;
    maxVal?: number;
    nBalls?: number;
    nRows?: number;
    nBuckets?: number;
    onTouch?: Function;
    onChange?: Function;
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
    constructor(o: InitConfigObject);
    render(target: string, order: ValidRenderOrder, r: boolean): void;
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
}
export default DistributionBuilder;
