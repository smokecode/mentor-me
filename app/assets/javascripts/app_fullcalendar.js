/* ------------------------------------------------------------------------------
*
*  # Fullcalendar basic options
*
*  Specific JS code additions for extra_fullcalendar_views.html and
*  extra_fullcalendar_styling.html pages
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */
$(function() {
  $('.fullcalendar-basic').fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      timezone: 'local',
      editable: false,
      allDaySlot: false,
      defaultView: 'agendaWeek',
      slotEventOverlap: false,
      slotLabelInterval: '00:30:00',
      events: {
          url: '/api/timeslots',
          type: 'get'
      },
      selectable: true,
      select: function(start, end, jsEvent, view) {
         $('#modal_new_timeslot').modal({ show: true });
         $('.datepicker').val(moment(start).format('MMMM D, YYYY'));
         $('.timepicker').val(moment(start).format('h:mm a'));
      },
      eventClick: function(event, jsEvent, view) {
        var url = '/timeslots/' + event.id
        $('#modal_remote').modal({
            remote: url,
            show: true
        });
      }
  });

  // Fix for modals not changing between shows
  $('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
  });
});