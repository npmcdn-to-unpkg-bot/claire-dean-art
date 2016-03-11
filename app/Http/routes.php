<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/test/data', 'TestController@index');


Route::get('/', 'HomeController@index');


Route::get('/gallery', 'GalleryController@index');
Route::get('/contact', 'ContactController@index');
//FIXME: Display only public images
Route::get('/about', 'AboutController@index');


   //FIXME: Used only for initial registration
   //Temp to set up Admin Users
   Route::get('admin/register', 'UserController@getRegister');
   Route::post('admin/register/auth', 'UserController@postRegister');



/* Login Routes */
Route::get('admin/login', 'UserController@getLogin');
Route::post('admin/login/auth', 'UserController@postLogin');

/* Logout Route */
Route::get('admin/logout', 'UserController@getLogout');



Route::group(['middleware'=>'admin'], function() {
   //Home
   Route::get('admin/home', 'UserController@home');

   //Gallery
   Route::get('admin/gallery/upload', 'AdminGalleryController@upload');
   Route::post('admin/gallery/upload/store', 'AdminGalleryController@storeArtwork');
   Route::get('admin/gallery/edit', 'AdminGalleryController@displayEdit');
   Route::post('admin/gallery/remove-image', 'AdminGalleryController@removeImage');
   Route::post('admin/gallery/set-order', 'AdminGalleryController@setOrder');
   Route::post('admin/gallery/get-title', 'AdminGalleryController@getImageTitle');

   //About
   Route::get('admin/about/edit', 'AboutController@displayEdit');
   Route::post('admin/about/edit/save-page', 'AboutController@savePageEdits');

   //Contact
   Route::get('admin/contact/edit', 'ContactController@displayEdit');
});


//routes all other routes to home
Route::any('{all}', function() {
   return redirect('/');
})->where('all', '.*');
