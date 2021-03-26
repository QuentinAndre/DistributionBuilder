# distBuilder
A Javascript library to conveniently add distribution builders to your online and offline experiments.

## Changelog:

### v1.4 (master)
* Added arguments to the initialization of the distBuilder:
  * `toggleGridClick`. If true, this argument allows user to add balls to bucket by clicking on the grid.
  * `addTotals`. If true, add a "totals" row at the bottom of the distBuilder, summarizing how many balls are in each bucket.
    Thanks to Marine Hainguerlot for the suggestion!
  
* Fixed rare bugs causing the visual aspect of the distBuilder to diverge from its internal state
* Cleaned up the code and documentation. It should now be faster for larger distBuilders.


### v1.3 (master)
* Added method: `distBuilder.setDistribution()`. This function is useful if you want the user to start from
a pre-specified distribution. Thanks to Roy Hsieh for the suggestion!


### v1.2
* Minor changes to CSS to enhance compatibility with Qualtrics.
* distBuilder has been rewritten in Typescript. This does not affect the behavior of the library in any
way, but makes it easier for developers to build more complex apps on top of distBuilder.


### v1.1
* The width of the distribution builder is now automatically adjusted
using CSS `flexbox`.
* The argument `resize` of `DistributionBuilder.render()` will be
deprecated in future versions. For compatibility reasons, using the
`resize` argument does not raise an error, but it no longer affects the
behavior of the distribution builder.
* Changed the HTML structure: the inner `<div class="cell"></div>` now
includes a `<div class="ball"></div>`. The appearance of the "balls" in
the distribution builder can now be changed more easily.
* The method `getDistribution()` now returns a copy of the current allocation. This is to avoid 
accidental side-effects.


### v1.0
* First release of the library.


[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.166736.svg)](https://doi.org/10.5281/zenodo.166736)
