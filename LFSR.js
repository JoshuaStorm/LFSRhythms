function LFSR (length, leftTap, rightTap) {
    this.leftTap = leftTap;
    this.rightTap = rightTap;
    this.state = [];

    if (leftTap > length || rightTap > length)
        console.log("ERROR: Can't have tap greater than length");

    for (var i = 0; i < length; i++)
        this.state.push(Math.round(Math.random()));
}

LFSR.prototype.getState = function() {
    return this.state;
}

LFSR.prototype.shift = function() {
    var newVal = this.state[this.leftTap]  ^ this.state[this.rightTap];
    var retVal = this.state.shift();
    this.state.push(newVal);
    return retVal;
}
