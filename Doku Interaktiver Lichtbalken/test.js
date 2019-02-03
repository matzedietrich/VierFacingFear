/* jslint esversion: 6 */

import Lichtbalken from "./classLichtbalken";

let balken = new Lichtbalken(50, 50, 200, 10);

p5.draw = function(){
    balken.show();
    balken.update();
};