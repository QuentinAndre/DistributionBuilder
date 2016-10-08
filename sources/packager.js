import DistributionBuilder from './distributionbuilder'
import jQuery from 'jquery';
var $j = jQuery.noConflict();
(function(window){
    window.DistributionBuilder = DistributionBuilder;
    window.$j = $j;

})(window);

