// this function receives two character strings and returns the number of changes needed to transform one string into the other.

function checkIfIsASimilarString(string1, string2) {
    const m = string1.length;
    const n = string2.length;
    const d = [];

    for (let i = 0; i <= m; i++) {
        d[i] = [i];
    }
    for (let j = 0; j <= n; j++) {
        d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (string1[i - 1] === string2[j - 1]) {
                d[i][j] = d[i - 1][j - 1];
            } else {
                d[i][j] = Math.min(
                    d[i - 1][j] + 1, // Deletar
                    d[i][j - 1] + 1, // Inserir
                    d[i - 1][j - 1] + 1 // Substituir
                );
            }
        }
    }

    return d[m][n];
}

module.exports = checkIfIsASimilarString;