
class ShowCommandHelper {
    static getSize(moves, defaultSize) {
        let splitMoves = moves.split(' ');
        if (splitMoves.length >= 1) {
            const firstMoveNum = parseInt(splitMoves[0]);
            if (isNaN(firstMoveNum)) {
                return { size: defaultSize, newMoves: splitMoves.join('') };
            }
            else {
                splitMoves.shift();
                return { size: firstMoveNum, newMoves: splitMoves.join('') };
            }
        }
    }
}

module.exports = ShowCommandHelper;