<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Artwork;

class GalleryController extends Controller
{
   public function index() {
      //only show public images to guest
      $images = Artwork::getPublicImages();
      $imgArr = array();
      foreach ($images as $image) {
         array_push($imgArr, $image);
      }
      return view('guest.gallery')->with('images', $imgArr);
   }
}
