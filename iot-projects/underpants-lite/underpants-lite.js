// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var _ = {
    identity: function (input) {
        return input;
    },
    typeOf: function  (input) {
        if (Array.isArray(input) === true) {
            return "array";
        }
        if (input === null) {
            return "null";
        }
        return typeof input;
    },
    first: function (arr, num) {
        if (Array.isArray(arr) === false) {
            return [];
        }
        else if (typeof(num) !== "number") {
            return arr[0];
        }
        else if (num < 0) {
            return [];
        }
        else if (num > arr.length) {
            return arr;
        }
        else {
            var result = [];
            for (let i = 0; i < arr.length; i++) {
                if (i < num) {
                    result.push(arr[i]);
                }
            }
            return result;
        }
        
    },
    last: function (arr, num) {
        if (Array.isArray(arr) === false) {
            return [];
        }
        else if (typeof(num) !== "number") {
            return arr[arr.length-1];
        }
        else if (num < 0) {
            return [];
        }
        else if (num > arr.length) {
            return arr;
        }
        else {
            var result = [];
            for (let i = 0; i < arr.length; i++) {
                if (i > arr.length - (num + 1)) {
                    result.push(arr[i]);
                }
            }
            return result;
        }
        
    },
    indexOf: function (arr, val) {
        var result = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return i;
            }
         }
        return -1;
    },
    contains: function (arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return true;
            }
        }
        return false;
    },
    each: function (collection, func) {
        if (_.typeOf(collection) === "array") {
            var updatedArr = []
            for (var i = 0; i < collection.length; i++) {
                updatedArr.push(func(collection[i], i, collection))
            }    
            return updatedArr;
        }
        if (_.typeOf(collection) === "object") {
            var updatedObj = {};
            for (var key in collection) {
                updatedObj[key] = func(collection[key], key, collection);
            }    
            return updatedObj;
        }
    },
};

/** _.filter
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) save the element in a new Array if calling <function> returned true
*   3) return the new Array
* Edge Cases:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){ return x%2 === 0; }) -> [2,4]
* Extra Credit:
*   use _.each in your implementation
*/


/** _.map
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, it's key, <collection>
*   3) save the return value of each <function> call in a new array
*   4) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){ return e * 2; }) -> [2,4,6,8]
*/


/** _.reject
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) save the element in a new Array if calling <function> returned false
*   3) return the new Array
*
* HINT: This is the logical inverse of _.filter() - how can you use it in your implementation?
*
* Examples:
*   _.reject([1,2,3,4,5], function(e){ return e%2 === 0}; ) -> [1,3,5]
*/


/** _.partition
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Edge Cases:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/


/** _.every
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, it's key, <collection>
*   3) If the return value of calling <function> for every element is true, return true
*   4) If even one of them returns false, return false
*   5) If <function> is not provided, return true if every element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){ return e % 2 === 0}; ) -> true
*   _.every([1,2,3], function(e){ return e % 2 === 0}; ) -> false
*/


/** _.some
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, it's key, <collection>
*   3) If the return value of calling <function> is true for at least one element, return true
*   4) If it is false for all elements, return false
*   5) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){ return e % 2 === 0}; ) -> false
*   _.some([1,2,3], function(e){ return e % 2 === 0}; ) -> true
*/


/** _.pluck
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/


//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = _;
}
