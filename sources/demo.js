import DistributionBuilder from './distributionbuilder'
import jQuery from 'jquery';
console.log("Test?");
var $j = jQuery.noConflict();

$j(document).ready(() => {
        var distbuilder0 = new DistributionBuilder({});
        distbuilder0.render("targetdiv0");
        distbuilder0.labelize({});

        var distbuilder1 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 20,
            nBuckets: 20,
            nBalls: 50,
            onTouch: function () {
                console.log("Distbuilder was touched!")
            },
            onChange: function () {
                console.log("Distbuilder was updated!");
            }
        });

        var distbuilder2 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 20,
            nBuckets: 20,
            nBalls: 50,
            onTouch: function () {
                console.log("Distbuilder was touched!")
            },
            onChange: function () {
                console.log("Distbuilder was updated!");
            }
        });

        var distbuilder3 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 20,
            nBuckets: 20,
            nBalls: 50,
            onTouch: function () {
                console.log("Distbuilder was touched!")
            },
            onChange: function () {
                console.log("Distbuilder was updated!");
            }
        });


        distbuilder1.render("targetdiv1");
        distbuilder1.labelize({});
        distbuilder2.render("targetdiv2", "labels-grid-buttons");
        distbuilder2.labelize({});

        distbuilder3.render("targetdiv3");
        distbuilder3.labelize({
            prefix: '~',
            suffix: '€'
        });

        var n_balls = 20;
        $j('#BallsLeft').text("You have " + n_balls + " balls left.");
        $j('#BallsAllocated').text("You have allocated " + 0 + " balls.");
        var distbuilder4 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 20,
            nBuckets: 20,
            nBalls: n_balls,
            onChange: function () {
                var remainingballs = this.getRemainingBalls();
                var ballsallocated = n_balls - this.getRemainingBalls();
                $j('#BallsLeft').text("You have " + remainingballs
                    + " balls left.");
                $j('#BallsAllocated').text("You have allocated " +
                    ballsallocated + " balls.");
            }
        });

        distbuilder4.render("targetdiv4");
        distbuilder4.labelize({});

        var distbuilder5 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 20,
            nBuckets: 20,
            nBalls: 20,
            onChange: function () {
                if (this.isComplete()) {
                    $j("#SubmitDistribution").attr("disabled", false)
                } else {
                    $j("#SubmitDistribution").attr("disabled", true)
                }
            }
        });
        distbuilder5.render("targetdiv5");
        distbuilder5.labelize({});
        $j("#SubmitDistribution").click(function() {alert(distbuilder5.getDistribution())});

    }
);
