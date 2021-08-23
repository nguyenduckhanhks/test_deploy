<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin', 'namespace' => 'Api'], function() {
    Route::post('/login', 'AuthController@authenticate');
    Route::post('/signup', 'AuthController@signup');
    Route::post('/get-user', 'AuthController@getUserDataByUsername');

    Route::group(['middleware' => 'auth:api'], function() {
        Route::post('/logout', 'AuthController@logout');
        Route::get('/get-profile', 'AuthController@getProfile');
    });
});

Route::group(['namespace' => 'Api'], function() {
    Route::group(['middleware' => 'auth:api'], function() {
        Route::post('/add-links', 'AdminController@addLinks');
        Route::get('/get-all-links', 'AdminController@getAllLinksByUserLogin');
        Route::post('/update-links', 'AdminController@updateLinks');
        Route::post('/update-profile', 'AdminController@updateProfile');
        Route::post('/update-socials', 'AdminController@updateSocials');
        Route::post('/get-all-socials', 'AdminController@getAllSocials');
        Route::post('/remove-links', 'AdminController@removeLinks');
        Route::post('/change-thumbnail', 'AdminController@updateThumbnailLinks');
        Route::post('/update-avatar', 'AdminController@updateAvatar');
        Route::post('/update-cover', 'AdminController@updateCoverImage');
    });

    Route::post('get-socials', 'AdminController@getSocials');
    Route::post('/get-links', 'AdminController@getAllLinksByUsername');

});

Route::group(['namespace' => 'Api'], function() {
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('get-themes', 'ThemesController@getAllThemes');
        Route::post('/change-theme', 'ThemesController@updateThemesForUser');
    });
});