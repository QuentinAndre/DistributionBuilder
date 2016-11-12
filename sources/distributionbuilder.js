/**
 * Created by Quentin on 07/10/2016.
 */
import jQuery from 'jquery';
require('./distributionbuilder.css');
require("bootstrap-webpack!./bootstrap.config.js");
var $j = jQuery.noConflict();
import MouseHold from './../dependencies/mousehold'
MouseHold($j);
require('expose?$j!expose?jQuery!jquery');

class DistributionBuilder {
    constructor(o) {
        var obj = o ? o : {};
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
        this._$target = false;
    }


    render(target, o, r) {
        if ((this._$target)) {
            this._$target.html('');
            this._$target.removeClass('distbuilder');
        }
        let parts = {
            'grid': this._getGrid($target),
            'labels': this._getLabels($target),
            'buttons': this._getButtons($target)
        };
        var validOrder = new RegExp('(buttons-grid-labels)|(grid-labels-buttons)|(labels-grid-buttons)|(labels-buttons-grid)|(grid-buttons-labels)|(buttons-labels-grid)', 'g');
        var $target = $j('#' + target); //Target Div of Grid
        this._$target = $target;
        $target.addClass('distbuilder');
        let order = o ? o : "grid-labels-buttons";
        let resize = r ? r : true;
        if (!validOrder.test(order)) {
            throw ("The order '" + o + "' could not be understood. Make sure " +
            "that the order is any combination of 'labels', 'grid', and " +
            "'button, separated by '-'.")
        } else {
            let renderorder = order.split('-');
            renderorder.map((e) => $target.append(parts[e]))
        }
        if (resize) {
            this._resizeGrid();
        }
    }

    labelize(o) {
        var obj = o ? o : {};
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
        return this.distribution;
    }

    _setLabels(labels) {
        labels.map((l, i) => {
            let label = this._$target.find('.label' + i);
            label.html(l);
        })
    }

    _actionCreator(action) {
        if (action == 'increment') {
            return (bucket) => {
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
            return (bucket) => {
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

    _resizeGrid() {
        var rowwidth = (this._$target.find('>.grid>.distrow').width() - 5) / this.nBuckets;
        var cellwidth = this._$target.find('>.grid>.distrow>.cell').outerWidth();
        var cellmargin = (rowwidth - cellwidth) / 2;
        this._$target.find('>.grid>.distrow>.cell').css({'margin-left': cellmargin, 'margin-right': cellmargin});
        this._$target.find('>.buttons>.distrow>.buttongroup').css({'width': rowwidth});
        this._$target.find('>.labels>.distrow>.label').css({'width': rowwidth});
    }

    _getGrid($target) {
        let nRows = this.nRows;
        let nBuckets = this.nBuckets;
        let $grid = $j('<div>', {class: "grid"}); //Div holding the grid
        for (let row = 0; row < nRows; row++) { // Create as many rows as needed
            let rowIndex = (nRows - row - 1); // Row number 0 is the bottom-most row.
            let $lineDiv = $j('<div>', {class: "distrow row" + rowIndex});
            for (let col = 0; col < nBuckets; col++) { // Create as many cells as needed
                let $colDiv = $j("<div>", {"class": "cell " + "col" + col});
                $lineDiv.append($colDiv); // Add each cell to the row
            }
            $grid.append($lineDiv); // Add each row to the grid div
        }
        return $grid
    }

    _getButtons($target) {
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

    _getLabels($target) {
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

module.exports = DistributionBuilder;