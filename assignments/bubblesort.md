# 버블 정렬

```javascript
function bubbleSort(array) {
    for (i = 0; i < array.length; i++)
    for (j = 0; j < array.length - i; j++) {
        if (array[j] > array[j + 1]) {
            let x = array[j + 1]
            array[j + 1] = array[j]
            array[j] = x
        }
    }
    return array;
}

console.log(bubbleSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
```

