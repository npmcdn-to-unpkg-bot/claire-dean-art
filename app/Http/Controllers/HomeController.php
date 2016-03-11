<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use App\User;

class HomeController extends Controller
{
   public function index()
   {
      if (Auth::check()) {
         return view('admin.home')->with('user', Auth::user());
      } else
         return view('guest.home');
   }

}
