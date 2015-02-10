module.exports = function (file) {
    return file.map(function (line) {
        return parseLine(line);
    }).splice(0, file.length - 1);
};

function parseLine (line) {
    var parts = line.split(" ");

    if (parts.length > 14) {
    return {
        host: parts[0].split(":")[0],
        port: parts[0].split(":")[1],
        frontend: parts[2],
        backend: parts[3].split("/")[0],
        backendServer: parts[3].split("/")[1],
        Tq: +parts[4].split("/")[0],
        Tw: +parts[4].split("/")[1],
        Tc: +parts[4].split("/")[2],
        Tr: +parts[4].split("/")[3],
        Tt: +parts[4].split("/")[4],
        status: +parts[5],
        bytes: +parts[6],
        termination: parts[9],
        method: parts[12].split("\"")[1],
        path: parts[13],
        protocol: parts[14].split("\"")[0]
    };
    } else {
        return {};
    }
};
