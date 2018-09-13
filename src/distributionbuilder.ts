/**
 * Created by Quentin André on 07/10/2016.
 */
import * as jQuery from "jquery";
import './distributionbuilder.css';
import "bootstrap-webpack!./bootstrap.config.js";

var $j = jQuery.noConflict();
import MouseHold from './../dependencies/mousehold'
MouseHold($j);

interface InitConfigObject {
    minVal?: number
    maxVal?: number
    nBalls?: number
    nRows?: number
    nBuckets?: number
    onTouch?: Function
    onChange?: Function

}

interface LabelizeConfigObject {
    labels?: Array<number | string>
    prefix?: string
    suffix?: string
}

declare global {
    interface JQuery {
        mousehold(timestart: number, timeout: number, callback: Function): any;
    }
}

type ValidRenderOrder =
    "buttons-grid-labels"
    | "grid-labels-buttons"
    | "labels-grid-buttons"
    | "-buttons-grid"
    | "grid-buttons-labels"
    | "buttons-labels-grid";

type ValidButtonAction = "increment" | "decrement";

class DistributionBuilder {
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

    constructor(o: InitConfigObject) {
        let obj = o ? o : {};
        this.min = obj.hasOwnProperty('minVal') ? obj.minVal : 0;
        this.max = obj.hasOwnProperty('maxVal') ? obj.maxVal : 10;
        this.nBalls = obj.hasOwnProperty('nBalls') ? obj.nBalls : 10;
        this.nRows = obj.hasOwnProperty('nRows') ? obj.nRows : 10;
        this.nBuckets = obj.hasOwnProperty('nBuckets') ? obj.nBuckets : 10;
        this.onTouch = obj.hasOwnProperty('onTouch') ? obj.onTouch : () => {
        };
        this.onChange = obj.hasOwnProperty('onChange') ? obj.onChange : () => {
        };
        this.remainingBalls = this.nBalls;
        this.distribution = new Array(this.nBuckets).fill(0);
        this._$target = $j('<div></div>');
    }

    render(target: string, order: ValidRenderOrder, r: boolean) {
        if (r) {
            console.warn("The 'resize' argument has been deprecated.");
        }
        if ((this._$target)) { // Has already been rendered
            this._$target.html('');
            this._$target.removeClass('distbuilder');
        }
        let $target = $j('#' + target); // Target Div of Grid
        let parts = {
            'grid': this._createGrid($target),
            'labels': this._createLabels($target),
            'buttons': this._createButtons($target)
        };
        let validOrder = new RegExp('(buttons-grid-labels)|(grid-labels-buttons)|(labels-grid-buttons)|(labels-buttons-grid)|(grid-buttons-labels)|(buttons-labels-grid)', 'g');
        this._$target = $target;
        $target.addClass('distbuilder');
        let o = order ? order : "grid-labels-buttons";
        if (!validOrder.test(o)) {
            throw ("The order '" + o + "' could not be understood. Make sure " +
                "that the order is any combination of 'labels', 'grid', and " +
                "'button, separated by '-'.")
        } else {
            let renderorder = o.split('-');
            renderorder.forEach((e: string) => $target.append(parts[e]))
        }
    }

    labelize(o: LabelizeConfigObject) {
        let obj = o ? o : {};
        let values = [];
        if (obj.hasOwnProperty('labels')) {
            values = obj.labels
        } else {
            let step = (this.max - this.min) / this.nBuckets;
            values = Array.from({length: this.nBuckets}, (value, key) => this.min + key * step + step / 2);
        }
        let prefix = obj.hasOwnProperty('prefix') ? obj.prefix : '';
        let suffix = obj.hasOwnProperty('suffix') ? obj.suffix : '';
        let labels = values.map((v) => prefix + v + suffix);
        this._setLabels(labels)
    }

    isComplete() {
        return (this.remainingBalls == 0);
    }

    getRemainingBalls() {
        return this.remainingBalls;
    }

    getDistribution() {
        return this.distribution.slice();
    }

    _setLabels(labels: Array<string>) {
        labels.forEach((l, i) => {
            let label = this._$target.find('.label' + i);
            label.html(l);
        })
    }

    _actionCreator(action: ValidButtonAction) {
        if (action == 'increment') {
            return (bucket: number) => {
                return () => {
                    this.onTouch();
                    if ((this.distribution[bucket] < (this.nRows)) && (this.remainingBalls > 0)) {
                        let rowIndex = this.distribution[bucket];
                        this._$target.find(".row" + rowIndex + ">.col" + bucket).addClass("filled");
                        this.distribution[bucket]++;
                        this.remainingBalls--;
                        this.onChange()
                    }
                }
            }
        } else {
            return (bucket: number) => {
                return () => {
                    this.onTouch();
                    if (this.distribution[bucket] > 0) {
                        this.distribution[bucket]--;
                        let rowIndex = this.distribution[bucket];
                        this._$target.find(".row" + rowIndex + ">.col" + bucket).removeClass("filled");
                        this.remainingBalls++;
                        this.onChange();
                    }
                }
            }
        }
    }

    _createGrid($target: JQuery<HTMLElement>) {
        let nRows = this.nRows;
        let nBuckets = this.nBuckets;
        let $grid = $j('<div>', {class: "grid"}); //Div holding the grid
        for (let row = 0; row < nRows; row++) { // Create as many rows as needed
            let rowIndex = (nRows - row - 1); // Row number 0 is the bottom-most row.
            let $lineDiv = $j('<div>', {class: "distrow row" + rowIndex});
            for (let col = 0; col < nBuckets; col++) { // Create as many cells as needed
                let $colDiv = $j("<div>", {"class": "cell " + "col" + col});
                let $ball = $j("<div>", {"class": "ball " + "col" + col});
                $colDiv.append($ball);
                $lineDiv.append($colDiv); // Add each cell to the row
            }
            $grid.append($lineDiv); // Add each row to the grid div
        }
        return $grid
    }

    _createButtons($target: JQuery<HTMLElement>) {
        let incrementAction = this._actionCreator('increment'); //Currying functions
        let decrementAction = this._actionCreator('decrement'); //Currying functions
        let $lineDivButtons = $j("<div>", {class: "distrow"});
        let $buttons = $j('<div>', {class: "buttons"}); //Div holding the buttons
        for (let col = 0; col < this.nBuckets; col++) {
            let $divButtons = $j("<div>", {"class": "buttongroup"});
            let $addButton = $j('<a>', {class: "btn btn-default distbutton glyphicon glyphicon-plus"});
            let $removeButton = $j('<a>', {class: "btn btn-default distbutton glyphicon glyphicon-minus"});
            $divButtons.append($addButton
                .mousehold(200, 100, incrementAction(col))
                .click(incrementAction(col))
            );
            $divButtons.append($removeButton
                .mousehold(200, 100, decrementAction(col))
                .click(decrementAction(col))
            );
            $lineDivButtons.append($divButtons);
        }
        $buttons.append($lineDivButtons);
        return $buttons
    }

    _createLabels($target: JQuery<HTMLElement>) {
        let $labels = $j('<div>', {class: "labels"}); //Div holding the buttons
        let $lineDivLabels = $j("<div>", {"class": "distrow"});
        for (let col = 0; col < this.nBuckets; col++) {
            let $divLabel = $j("<div>", {"class": "label" + " label" + col});
            $lineDivLabels.append($divLabel);
        }
        $labels.append($lineDivLabels); // Add each row to the grid div
        return $labels
    }


}

export default DistributionBuilder;