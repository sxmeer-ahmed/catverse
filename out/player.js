"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ambu = exports.dead = exports.stop = exports.intro = exports.happy = exports.cry = void 0;
const cp = require("child_process");
const path = require("path");
const player = require('play-sound')();
const isWindows = process.platform === 'win32';
const windowsPath = path.join(__dirname, "/../audio/sounder.exe");
const playerAdapter = () => ({
    afplay: ['-v', 100],
    mplayer: ['-af', `volume=100`],
});
const cry = () => {
    const cryPath = path.join(__dirname, "/../audio/cry.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', cryPath]);
            resolve();
        }
        else {
            player.play(cryPath, playerAdapter(), (err) => {
                if (err) {
                    console.error("Error playing sound:", cryPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};
exports.cry = cry;
const happy = () => {
    const happyPath = path.join(__dirname, "/../audio/happy.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', happyPath]);
            resolve();
        }
        else {
            player.play(happyPath, playerAdapter(), (err) => {
                if (err) {
                    console.error("Error playing sound:", happyPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};
exports.happy = happy;
const intro = () => {
    const introPath = path.join(__dirname, "/../audio/open.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', introPath]);
            resolve();
        }
        else {
            player.play(introPath, playerAdapter(), (err) => {
                if (err) {
                    console.error("Error playing sound:", introPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};
exports.intro = intro;
const stop = () => {
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop']);
            resolve();
        }
        else {
            player.play('/stop', playerAdapter(), (err) => {
                if (err) {
                    console.error("Error playing sound:", '/stop', " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};
exports.stop = stop;
const dead = () => {
    const introPath = path.join(__dirname, "/../audio/dead.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', introPath]);
            resolve();
        }
        else {
            player.play(introPath, playerAdapter(), (err) => {
                if (err) {
                    console.error("Error playing sound:", introPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};
exports.dead = dead;
const ambu = () => {
    const introPath = path.join(__dirname, "/../audio/ambu.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', introPath]);
            resolve();
        }
        else {
            player.play(introPath, playerAdapter(), (err) => {
                if (err) {
                    console.error("Error playing sound:", introPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};
exports.ambu = ambu;
//# sourceMappingURL=player.js.map