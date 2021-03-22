import { statusList } from '../constants/statusConstats';
import * as moment from 'moment';

function convertDate(timestamp) {

    var todate = new Date(timestamp).getDate();
    if (todate > 0 && todate < 9) {
        todate = '0' + todate;
    }
    var tomonth = new Date(timestamp).getMonth() + 1;
    if (tomonth > 0 && tomonth < 9) {
        tomonth = '0' + tomonth;
    }
    var toyear = new Date(timestamp).getFullYear();
    var original_date = toyear + '-' + tomonth + '-' + todate;
    return original_date;
}

function convertDateCool(timestamp) {
    return moment(timestamp).calendar();
}

function statusDescription(value) {
    var stat = statusList.find(item => item.value === value);
    return stat.label;
}

function buildAgenda(beginDate, endDate, projectList) {

    var daynull = { day: null, projects: [] };
    var item = {
        0: daynull,
        1: daynull,
        2: daynull,
        3: daynull,
        4: daynull,
        5: daynull,
        6: daynull,
    };

    var arr1 = [];
    for (var dt = new Date(beginDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        var i = dt.getDay();
        item[i] = { day: new Date(dt), projects: [] };

        if (dt.getDay() === 6) {
            arr1.push(item);
            item = {
                0: daynull,
                1: daynull,
                2: daynull,
                3: daynull,
                4: daynull,
                5: daynull,
                6: daynull,
            };
        }

    }

    arr1.forEach(arrItem => {
        for (var i = 0; i < 7; i++) {
            // eslint-disable-next-line no-loop-func
            projectList.forEach(projectItem => {
                if (new Date(arrItem[i].day) >= new Date(projectItem.begin_date) &&
                    new Date(arrItem[i].day) <= new Date(projectItem.end_date)) {
                    arrItem[i].projects.push(projectItem);
                }
            });
        };
    });

    return arr1;
}

function getFirstDate(projectsList) {

    let projectBD = projectsList;
    projectBD.sort(
        function(a, b) {
            var dateA = new Date(a.begin_date);
            var dateB = new Date(b.begin_date);
            return dateA.getTime() - dateB.getTime();
        }
    );

    if (projectBD[0]) {
        return new Date(getMonday((projectBD[0].begin_date), false));
    } else {
        return new Date(getMonday((new Date()), false));
    }
}

function getlastDate(projectsList) {
    let projectED = projectsList;
    projectED.sort(
        function(a, b) {
            var dateA = new Date(a.end_date);
            var dateB = new Date(b.end_date);
            return dateA.getTime() - dateB.getTime();
        }
    );


    if (projectED[projectsList.length - 1]) {
        return new Date(getMonday(new Date(projectED[projectsList.length - 1].end_date), true));
    } else {
        var dateEndCal = new Date();
        dateEndCal = new Date(getMonday(new Date(dateEndCal.getDate() + 30), true));
        return dateEndCal;
    }
}

function getMonday(d, op) {
    var today = new Date(d);

    if (!op) {
        return (new Date(moment(today).startOf('week').toDate()));

    } else {
        return (new Date(moment(today).endOf('week').toDate()));
    }
}

function buildCalendar(beginDate, endDate, projectList) {

    var arr1 = [];


    // eslint-disable-next-line array-callback-return
    projectList.map(projectItem => {
        var i = 0;
        var item = {};
        for (var dt = new Date(beginDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
            item[i] = { day: new Date(dt), project: {} };
            i++;
        }
        for (var j = 0; j < Object.keys(item).length; j++) {

            //if (new Date(item[j].day).setHours(0, 0, 0, 0) === new Date(projectItem.begin_date).setHours(0, 0, 0, 0)) {
            var diff = moment(new Date(item[j].day).setHours(0, 0, 0, 0)).diff(new Date(projectItem.begin_date).setHours(0, 0, 0, 0), "days");
            if (diff === 0) {
                item[j].project = projectItem;
                //item[j].colspan = ((new Date(projectItem.end_date).getTime() - new Date(projectItem.begin_date).getTime()) / (1000 * 3600 * 24)) + 1;
                item[j].colspan = moment(new Date(projectItem.end_date)).diff(new Date(projectItem.begin_date), "days");
            }
            var diffend = moment(new Date(item[j].day).setHours(0, 0, 0, 0)).diff(new Date(projectItem.end_date).setHours(0, 0, 0, 0), "days");
            if (diffend < 0 && diff > 0) {
                item[j].project = projectItem;
            }
        }
        arr1.push(item);
        item = {};
    })

    return arr1;
}

function buildHeaderCalendar(beginDate, endDate) {

    var arr = [];

    for (var dt = new Date(beginDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        arr.push({ day: new Date(dt) });
    }

    return arr;
}
export { convertDate, statusDescription, getFirstDate, getlastDate, buildAgenda, buildCalendar, buildHeaderCalendar, convertDateCool };