$(document).ready(function(){
    $('#currentDay').text(moment().format('dddd, MMMM Do YYYY'));
    for (var i = 0; i < 24; i++) {
        var hourNumber = moment(i, 'HH').format('h:mm a');
        $('#schedule').append(
            '<div class="row hour">' +
            '  <div class="col-1 hour-number">' + hourNumber + '</div>' +
            '  <textarea class="col-10 hour-text"></textarea>' +
            '  <button class="col-1 save-button">Save</button>' +
            '</div>'
        )
    }

    $('.hour-text').each(function() {
        var hourNumber = $(this).parent().find('.hour-number').text();
        var hourTime = moment(hourNumber, 'h:mm a');
        if (hourTime.isBefore(moment(), 'hour')) {
            $(this).addClass('past');
        } else if (hourTime.isSame(moment(), 'hour')) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    })
    $('.save-button').click(function(){
        var hourNumber = $(this).parent().find('.hour-number').text();
        var hourText = $(this).parent().find('.hour-text').val();
        localStorage.setItem(hourNumber, hourText);
    })

    $('.hour-text').each(function(){
        var hourNumber = $(this).parent().find('.hour-number').text();
        var hourText = localStorage.getItem(hourNumber);
        $(this).val(hourText);
    })
})