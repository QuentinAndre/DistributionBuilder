import DistributionBuilder from './distributionbuilder.ts'
import jQuery from 'jquery';

var $j = jQuery.noConflict();

$j(document).ready(function () {
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
            nRows: 10,
            nBuckets: 20,
            nBalls: 10,
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
            nRows: 10,
            nBuckets: 20,
            nBalls: 10,
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

        var distbuilder4 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 10,
            nBuckets: 10,
            nBalls: 60
        });
        var dist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        distbuilder4.render("targetdiv4");
        distbuilder4.labelize();
        distbuilder4.setDistribution(dist);


        var n_balls = 10;
        $j('#BallsLeft').text("You have " + n_balls + " balls left.");
        $j('#BallsAllocated').text("You have allocated " + 0 + " balls.");
        var distbuilder5 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 10,
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

        distbuilder5.render("targetdiv5");
        distbuilder5.labelize({});

        var distbuilder6 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 10,
            nBuckets: 20,
            nBalls: 10,
            onChange: function () {
                if (this.isComplete()) {
                    $j("#SubmitDistribution1").attr("disabled", false)
                } else {
                    $j("#SubmitDistribution1").attr("disabled", true)
                }
            }
        });
        distbuilder6.render("targetdiv6");
        distbuilder6.labelize({});
        $j("#SubmitDistribution1").click(function () {
            alert("Distribution Validated!")
        });

        var distbuilder7 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 10,
            nBuckets: 20,
            nBalls: 10,
            onChange: function () {
                if (this.isComplete()) {
                    $j("#SubmitDistribution2").attr("disabled", false)
                } else {
                    $j("#SubmitDistribution2").attr("disabled", true)
                }
            }
        });
        distbuilder7.render("targetdiv7");
        distbuilder7.labelize({});
        $j("#SubmitDistribution2").click(function () {
            var message = "The distribution specified by the user is: " + distbuilder7.getDistribution();
            alert(message)
        });

        var distbuilder8 = new DistributionBuilder({
            minVal: 0,
            maxVal: 100,
            nRows: 10,
            nBuckets: 20,
            nBalls: 10,
            onChange: function () {
                if (this.isComplete()) {
                    $j("#SubmitDistribution3").attr("disabled", false)
                } else {
                    $j("#SubmitDistribution3").attr("disabled", true)
                }
            }
        });
        distbuilder8.render("targetdiv8");
        distbuilder8.labelize({});
        $j("#SubmitDistribution3").click(function () {
            var message = 'The function "Qualtrics.SurveyEngine.setEmbeddedData("MyDistributionResult",  ';
            message += distbuilder8.getDistribution().join() + ')" was called. Your data would have been stored in Qualtrics!';
            alert(message)
        });

    }
);
