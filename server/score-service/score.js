function getScore(zestimate, userZestimate, salePrice) {
    var beatZestimate = false, coeff = 100000000, score;
    if (salePrice == userZestimate) {
        beatZestimate = true;
        score = 100000000;
    }
    else {
        score = coeff / Math.abs(salePrice - userZestimate);
        if (Math.abs(zestimate - salePrice) > Math.abs(userZestimate - salePrice)) {
            beatZestimate = true;
            score *= 2;
        }
    }

    return {
        score: score,
        beatZestimate: beatZestimate
    };
}

module.exports.getScore = getScore;