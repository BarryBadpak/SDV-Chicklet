const platform = process.platform;
const url = require('url');
const titlebarId = 'titlebar';
const basedir = '/css/img/titlebar/';

function createButton(type: string) {

    function createImage(imageType: string, display: string = '') {
        if (typeof display !== 'string') {
            display = '';
        }

        let img = document.createElement('img');
        img.style.display = display;
        img.className = 'button-img-' + imageType;

        let src;
        if (platform === 'linux') {
            src = basedir + imageType + '.svg';
        } else if (platform === 'win32') {
            src = basedir + 'caption-buttons.svg#' + imageType;
        }

        img.setAttribute('src', src as string);
        return img;
    }

    let div = document.createElement('div');
    div.className = 'button button-' + type;

    if (type === 'maximize') {
        div.appendChild(createImage('maximize'));
        div.appendChild(createImage('restore', 'none'));
    } else {
        div.appendChild(createImage(type));
    }

    return div;
}

function showOrHide(elem: HTMLElement, show: boolean) {
    if (show === true) {
        elem.style.display = '';
    }
    else {
        elem.style.display = 'none';
    }
}

function installTitlebar() {
    if (window.electron_titlebar_installed === true) {
        return;
    }

    let titlebar = document.getElementById(titlebarId);
    if (!titlebar) {
        return;
    }

    window.electron_titlebar_installed = true;

    if (titlebar.classList.contains('drag')) {
        let drag = document.createElement('div');
        drag.style.position = 'absolute';
        drag.style.width = '100%';
        drag.style.height = '100%';
        drag.style.top = '0';
        drag.style.left = '0';
        drag.className = 'drag';
        titlebar.appendChild(drag);
    }

    const parentNode = document.body.parentNode;
    if (parentNode) {
        (<Element>parentNode).setAttribute('titlebar-platform', platform);
    }

    const w = require('electron').remote.getCurrentWindow();
    if (!w.isResizable() || !w.isMaximizable()) {
        titlebar.classList.add('no-maximize');
    }

    if (!w.isMinimizable()) {
        titlebar.classList.add('no-minimize');
    }

    if (platform !== 'darwin') {

        for (let x of ['close', 'minimize', 'maximize']) {
            titlebar.appendChild(createButton(x));
        }

        // register events
        for (let elem of Array.from(document.querySelectorAll(`#${titlebarId} > .button, #${titlebarId} > .button img`))) {
            elem.addEventListener('dragstart', (e: any) => { e.preventDefault(); });
        }

        let buttomImgMaximize = document.querySelector(`#${titlebarId} > .button .button-img-maximize`),
            buttomImgRestore = document.querySelector(`#${titlebarId} > .button .button-img-restore`);

        if (buttomImgMaximize !== null && buttomImgRestore !== null) {

            w.on('maximize', () => {
                showOrHide(buttomImgMaximize as HTMLElement, false);
                showOrHide(buttomImgRestore as HTMLElement, true);
            });

            w.on('unmaximize', () => {
                showOrHide(buttomImgMaximize as HTMLElement, true);
                showOrHide(buttomImgRestore as HTMLElement, false);
            });
        }

        // workaround for the .button is still :hover after maximize window
        for (let elem of Array.from(document.querySelectorAll(`#${titlebarId} > .button`))) {
            elem.addEventListener('mouseover', () => {
                elem.classList.add('hover');
            });
            elem.addEventListener('mouseout', () => {
                elem.classList.remove('hover');
            });
        }

        let buttonClose = document.querySelector(`#${titlebarId} > .button-close`);
        if (buttonClose) {
            buttonClose.addEventListener('click', () => {
                w.close();
            });
        }

        let butonMinimize = document.querySelector(`#${titlebarId} > .button-minimize`);
        if (butonMinimize) {
            butonMinimize.addEventListener('click', () => {
                w.minimize();
            });
        }

        let buttonMaximize = document.querySelector(`#${titlebarId} > .button-maximize`);
        if (buttonMaximize) {
            buttonMaximize.addEventListener('click', () => {
                if (!w.isMaximized()) {
                    w.maximize();
                }
                else {
                    w.unmaximize();
                }
            });
        }
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    installTitlebar();
}
else {
    document.addEventListener('DOMContentLoaded', installTitlebar);
}