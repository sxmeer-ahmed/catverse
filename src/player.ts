import * as cp from "child_process";
import * as path from 'path';
const player = require('play-sound')();
const isWindows = process.platform === 'win32';
const windowsPath = path.join(__dirname, "/../audio/sounder.exe");

const playerAdapter = () => ({
    afplay: ['-v', 100],
    mplayer: ['-af', `volume=100`],
});



export const cry = (): Promise<void> => {
    const cryPath = path.join(__dirname, "/../audio/cry.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', cryPath]);
            resolve();
        } else {
            player.play(cryPath, playerAdapter(), (err: any) => {
                if (err) {
                    console.error("Error playing sound:", cryPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};

export const happy = (): Promise<void> => {
    const happyPath = path.join(__dirname, "/../audio/happy.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', happyPath]);
            resolve();
        } else {
            player.play(happyPath, playerAdapter(), (err: any) => {
                if (err) {
                    console.error("Error playing sound:", happyPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};

export const intro = (): Promise<void> => {
    const introPath = path.join(__dirname, "/../audio/open.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', introPath]);
            resolve();
        } else {
            player.play(introPath, playerAdapter(), (err: any) => {
                if (err) {
                    console.error("Error playing sound:", introPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};

export const stop = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop']);
            resolve();
        } else {
            player.play('/stop', playerAdapter(), (err: any) => {
                if (err) {
                    console.error("Error playing sound:", '/stop', " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};

export const dead = (): Promise<void> => {
    const introPath = path.join(__dirname, "/../audio/dead.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', introPath]);
            resolve();
        } else {
            player.play(introPath, playerAdapter(), (err: any) => {
                if (err) {
                    console.error("Error playing sound:", introPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};

export const ambu = (): Promise<void> => {
    const introPath = path.join(__dirname, "/../audio/ambu.wav");
    return new Promise((resolve, reject) => {
        if (isWindows) {
            cp.execFile(windowsPath, ['/stop', introPath]);
            resolve();
        } else {
            player.play(introPath, playerAdapter(), (err: any) => {
                if (err) {
                    console.error("Error playing sound:", introPath, " - Description:", err);
                    return reject(err);
                }
                resolve();
            });
        }
    });
};