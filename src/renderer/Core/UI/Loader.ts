export default {

    /**
     * Hide the UI Loader
     *
     * @param message
     * @param slow
     */
    show(message = '', slow = false) {

        $('#ui-loader').removeClass('active')
            .removeClass('indeterminate')
            .addClass('active')
            .find('.text.loader')
            .text(message);

        if (!slow) {
            $('#ui-loader').addClass('indeterminate');
        }
    },

    /**
     * Show the UI Loader
     */
    hide() {

        $('#ui-loader').removeClass('active');
    },

    /**
     * Show the progress bar UI Loader
     *
     * @param message
     * @param total
     * @returns {function()}
     */
    showProgress(message = '', total: number) {

        const $progress = $('#ui-loader .ui.progress');
        (<any>$progress).progress('destroy').progress({
            'total': total,
            'duration': 200
        }).show().find('.label').text(message);

        $('#ui-loader .ui.loader').hide();
        $('#ui-loader').removeClass('active').addClass('active');

        return () => {
            (<any>$progress).progress('increment');
        };
    },

    /**
     * Hide the progress bar UI Loader
     */
    hideProgress() {

        (<any>$('#ui-loader .ui.progress')).progress('reset').hide();
        $('#ui-loader').removeClass('active').find('.ui.loader').show();
    }
};