
   @if(count($images) > 0)
      <div class="grid">
         <div class="grid-sizer"></div>
         @foreach ($images as $image)
            <div class="grid-item" id="{{$image->slug}}">
               <img class="image" src="{{asset('images').'/'.$image->file_name}}" alt="{{$image->slug}}" />
            </div>
         @endforeach
      </div>
   @else
      <div>
         <h4>No images found...</h4>
      </div>
   @endif
