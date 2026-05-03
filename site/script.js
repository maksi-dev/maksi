function shortenIPv6() {
    let ipv6 = document.getElementById("ipv6Input").value.trim();

    let parts = ipv6.split(":");

    if (parts.length !== 8) {
        document.getElementById("result").innerText = "Invalid IPv6 address";
        return;
    }

    // Remove leading zeros
    parts = parts.map(part => parseInt(part, 16).toString(16));

    // Replace NaN results from empty or invalid blocks
    if (parts.some(part => part === "NaN")) {
        document.getElementById("result").innerText = "Invalid IPv6 address";
        return;
    }

    // Find longest zero sequence
    let bestStart = -1;
    let bestLen = 0;
    let currStart = -1;
    let currLen = 0;

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "0") {
            if (currStart === -1) currStart = i;
            currLen++;
        } else {
            if (currLen > bestLen) {
                bestLen = currLen;
                bestStart = currStart;
            }
            currStart = -1;
            currLen = 0;
        }
    }

    if (currLen > bestLen) {
        bestLen = currLen;
        bestStart = currStart;
    }

    // Compress only if sequence is longer than 1
    if (bestLen > 1) {
        parts.splice(bestStart, bestLen, "");

        if (bestStart === 0) parts.unshift("");
        if (bestStart + bestLen === 8) parts.push("");
    }

    let shortened = parts.join(":").replace(/:{3,}/, "::");

    document.getElementById("result").innerText = shortened;
}
