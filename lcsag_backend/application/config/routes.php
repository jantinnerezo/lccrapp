<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'home';
$route['404_override'] = 'home/page_error';
$route['translate_uri_dashes'] = FALSE;

//Students

$route['allstudents'] = "Students/all_students";
$route['add_student'] = "Students/save_student";
$route['students'] = "Students/class_students";
$route['count_students'] = "Students/count_students";
$route['courses'] = "Students/courses";
$route['year'] = "Students/year_levels";
$route['existed'] = "Students/onsave_student";
$route['count_allstudents'] = "Students/count_allstudents";
$route['remove_student'] = "Students/rm_student";

//Class
$route['classlist'] = "Class_list/classList";
$route['current'] = "Class_list/sem_year";
$route['count'] = "Class_list/count_class";
$route['addclass'] = "Class_list/add_class";
$route['updateclass'] = "Class_list/update_class";
$route['deleteclass'] = "Class_list/delete";

//Add Class Selectors
$route['semester'] = "Class_list/get_sem";
$route['schoolyear'] = "Class_list/get_sy";
$route['classSchedules'] = "Class_list/classSchedules";
$route['rooms'] = "Class_list/rooms";

//Instructor
$route['login'] = "Instructor/login";
$route['instructor'] = "Instructor/signup";
$route['checkuser'] = "Instructor/signup_error";
$route['checkusername'] = "Instructor/username_check";
$route['update_profile'] = "Instructor/update_profile";
$route['instructors'] = "Instructor/instructors";


//Assessments
$route['assessments'] = "Assessment/assessments";
$route['types'] = "Assessment/types";
$route['terms'] = "Assessment/terms";
$route['add_student_assessment'] = "Assessment/add_student_assessment";
$route['add_assessment'] = "Assessment/add_assessment";
$route['update_assessment'] = "Assessment/update_assessment";
$route['student_assessment'] = "Assessment/stud_assessment";
$route['update_student_assessment'] = "Assessment/update_stud_assessment";
$route['delete_assessment'] = "Assessment/delete_assessment";

//Attendance
$route['attendance'] = "Attendance/attendance_list";
$route['get_id'] = "Attendance/get_id";
$route['add_attendance'] = "Attendance/add_attendance";
$route['add_student_attendance'] = "Attendance/add_student_attendance";
$route['count_attendance'] = "Attendance/count_attendance";
$route['attendance_details'] = "Attendance/attendance_details";
$route['student_attendance'] = "Attendance/stud_attendance";
$route['delete_attendance'] = "Attendance/delete_attendance";

//Student Profile
$route['student_class'] = "Students/display_student_class";
$route['student_attendance_record'] = "Students/display_attendance_count";



