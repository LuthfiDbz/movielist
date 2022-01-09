$.ajax({
    url: 'https://www.omdbapi.com',
    type: 'get',
    datatype: 'json',
    data: {
        'apikey'    : '6757dded',
        's'         : 'batman'
    },
    success: function(result) {
        if(result.Response == "True") {
            let movies = result.Search;
            $.each(movies, function(i, data) {
                $('#movie-list').append(`
                <div class="col-md-3 mb-3">
                    <div class="card">
                        <a href="#">
                        <img src="${data.Poster}" class="card-img-top" alt="...">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                            <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Details</a>
                        </div>
                    </div>
                </div>
                `)
            });
            $('#search-input').val('')
        } else {
            $('#movie-list').html(
                `<div class="movie col">
                        <h1 class="text-center">${result.Error}
                        </h1>
                </div>
                `)
        }
    }
});


function movieResult() {
    $('#movie-list').html('');
    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey'    : '6757dded',
            's'         : $('#search-input').val()  
        },
        success: function(result) {
            if(result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-3 mb-3">
                        <div class="card">
                            <a href="#">
                            <img src="${data.Poster}" class="card-img-top" alt="...">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">${data.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Details</a>
                            </div>
                        </div>
                    </div>
                    `)
                });
                $('#search-input').val('')
            } else {
                $('#movie-list').html(
                    `<div class="movie col">
                            <h1 class="text-center">${result.Error}
                            </h1>
                    </div>
                    `)
            }
        }
    });
};

$('#search-button').on('click', function() {
    movieResult();
});
$('#search-input').on('keyup', function(e) {
    if(e.keyCode == 13)
    {
        movieResult();
    };
})

$('#movie-list').on('click','.see-detail', function() {

    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey'    : '6757dded',
            'i'         : $(this).data('id')  
        },
        success: function(movie) {
            if(movie.Response === 'True') {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h2>${movie.Title}</h2></li>
                                    <li class="list-group-item"><strong>Released Date :</strong> ${movie.Released}</li>
                                    <li class="list-group-item"><strong>Genre :</strong> ${movie.Genre}</li>
                                    <li class="list-group-item"><strong>Director :</strong> ${movie.Director}</li>
                                    <li class="list-group-item"><strong>Actors :</strong> ${movie.Actors}</li>
                                    <li class="list-group-item"><strong>Plot Story :</strong>: ${movie.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    });
});