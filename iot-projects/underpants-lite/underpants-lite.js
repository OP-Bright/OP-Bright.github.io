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
    filter: function filter (arr, func) {
        var newArr = [];
        var result;
        for (var i = 0; i < arr.length; i++) {
            result = func(arr[i], i, arr)
            if (result === true) {
                newArr.push(arr[i])
            }
         }
        return newArr;
    },
    map: function (collection, func) {
        var newCollection;
        var result;
        if (Array.isArray(collection) === true) {
          newCollection = [];
          for (var i = 0; i < collection.length; i++) {
            result = func(collection[i], i, collection);
            newCollection.push(result);
          }
          return newCollection;
        } 
        else if (typeof collection === "object") {
          newCollection = [];
          for (var key in collection) {
            result = func(collection[key], key, collection)
            newCollection.push(result);
          }
          return newCollection;
        }
    },
    reject: function (arr, func) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            var result = func(arr[i], i, arr)
            if (result === false) {
                newArr.push(arr[i])
            }
        }
        return newArr;
    },
    partition: function (arr, func) {
        var newArr = [[],[]]
        for (var i = 0; i < arr.length; i++) {
            var result = func(arr[i], i, arr)
            if (result) {
                newArr[0].push(arr[i])
            }
            else {
                newArr[1].push(arr[i])
            }
        }
        return(newArr);
    },
    every: function (collection, func) {
        var newCollection;
        var result;
        if (Array.isArray(collection) === true) {
          newCollection = [];
          for (var i = 0; i < arr.length; i++) {
            func(collection[i], i, collection) 
          }

        } 
        else if (typeof collection === "object") {
          newCollection = [];
          
        }
    },
    // EVERY IS NOT FINISHED.

};

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
