export function getballHit(weights){
    return getRandom(weights)
}

function getRandom(weights) {
    var results = [0, 1, 2, 3, 4, 5, 6, -1]; // values to return
    var num = Math.random(),
        s = 0,
        lastIndex = weights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += weights[i];
        if (num < s) {
            return results[i];
        }
    }

    return results[lastIndex];
};

function getOversRemaining(overs) {
    if (Math.abs((overs % 1)-.6) < .0000001)
        return overs += .5;
    else 
        return overs += .1;
}