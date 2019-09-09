$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover', sanitize: false, sanitizeFn: content => content
     });
    //  console.log(webFrame.getZoomFactor(0.8));
})